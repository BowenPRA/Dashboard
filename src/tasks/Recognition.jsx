import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Check, BookOpen, Target, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import Feedback from '../components/Feedback';

/**
 * Vocabulary, in two passes.
 *
 * Pass 1 (Study) is the self-rated flashcard this task used to be: "do I know
 * this word?" — either button reveals the card, and **neither scores**. It is a
 * first exposure, not a check, and paying XP for it was the bug.
 *
 * Pass 2 (Check) is the test: the word, four definitions, distractors drawn
 * from the same unit. That is what the XP is for, and every answer is logged
 * per word so the track's vocabulary bank knows what is actually known.
 */

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/**
 * One MCQ per word. Distractors come from the same unit so the choice is
 * between four plausible definitions of related terms, not four unrelated ones
 * where the topic alone gives it away.
 */
const buildQuiz = (pool = []) => {
  const words = pool.filter((w) => w?.word && w?.def);
  // With fewer than three words there is nothing honest to build: a two-option
  // question is a coin flip. Such a unit keeps the study pass only.
  if (words.length < 3) return [];

  return shuffle(words).map((target) => ({
    target,
    options: shuffle([target, ...shuffle(words.filter((w) => w.word !== target.word)).slice(0, 3)]),
  }));
};

export default function Recognition({ pool = [], track, unitId, onComplete }) {
  const quiz = useMemo(() => buildQuiz(pool), [pool]);

  const [phase, setPhase] = useState('study'); // study -> bridge -> check
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [studyChoice, setStudyChoice] = useState(null);
  const [picked, setPicked] = useState(null);
  const [results, setResults] = useState([]); // [{ word, correct }]

  /**
   * XP is the check score out of 10 (the task's nativeMax). A unit too small to
   * build a check on pays for the study pass instead — otherwise its vocabulary
   * XP would be unreachable.
   */
  const finish = useCallback((finalResults) => {
    if (!quiz.length) { onComplete(10); return; }
    const right = finalResults.filter((r) => r.correct).length;
    onComplete(Math.round((right / quiz.length) * 10), null, {
      vocab: finalResults.map((r) => ({ word: r.word, correct: r.correct })),
      items: finalResults.map((r) => ({ itemId: r.word, correct: r.correct })),
    });
  }, [quiz.length, onComplete]);

  // --- study pass -----------------------------------------------------------
  const studyWord = pool[index];

  const rateSelf = useCallback((choice) => {
    if (phase !== 'study' || revealed) return;
    setStudyChoice(choice);
    setRevealed(true);
  }, [phase, revealed]);

  const nextStudy = useCallback(() => {
    if (!revealed) return;
    setRevealed(false);
    setStudyChoice(null);
    if (index + 1 < pool.length) {
      setIndex((i) => i + 1);
    } else if (quiz.length) {
      setPhase('bridge');
    } else {
      finish([]);
    }
  }, [revealed, index, pool.length, quiz.length, finish]);

  const startCheck = useCallback(() => {
    setPhase('check');
    setIndex(0);
  }, []);

  // --- check pass -----------------------------------------------------------
  const question = quiz[index];

  const answer = useCallback((option) => {
    if (phase !== 'check' || picked) return;
    const correct = option.word === question.target.word;
    setPicked({ word: option.word, correct });
    setResults((r) => [...r, { word: question.target.word, correct }]);
  }, [phase, picked, question]);

  const nextCheck = useCallback(() => {
    if (!picked) return;
    setPicked(null);
    if (index + 1 < quiz.length) setIndex((i) => i + 1);
    else finish(results);
  }, [picked, index, quiz.length, results, finish]);

  // Quitting banks whatever the check has proved so far — unanswered words
  // count as unknown, because they are.
  const quitNow = () => finish(results);

  // --- keyboard -------------------------------------------------------------
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const key = e.key.toLowerCase();

      if (phase === 'study' && !revealed) {
        if (key === 'y') rateSelf('yes');
        if (key === 'n') rateSelf('no');
      } else if (phase === 'bridge' && (e.key === 'Enter' || e.key === 'ArrowRight')) {
        e.preventDefault();
        startCheck();
      } else if (phase === 'check' && !picked && question) {
        const n = parseInt(key, 10);
        if (n >= 1 && n <= question.options.length) answer(question.options[n - 1]);
      }
      // The revealed state's Continue is owned by Feedback's own Enter handler.
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, revealed, picked, question, rateSelf, startCheck, answer]);

  // --- bridge ---------------------------------------------------------------
  if (phase === 'bridge') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 transition-colors">
        <div className="w-24 h-24 bg-[#58cc02]/10 border-[3px] border-[#58cc02]/30 rounded-[2rem] flex items-center justify-center mb-8">
          <Target className="w-11 h-11 text-[#58a700]" strokeWidth={2.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">Now prove it</h2>
        <p className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-1 max-w-md">
          {quiz.length} words. Pick the right meaning for each one. This part is worth the XP.
        </p>
        <p className="text-base font-medium italic text-slate-400 dark:text-slate-500 mb-10 max-w-md">
          {quiz.length} từ. Chọn nghĩa đúng cho mỗi từ. Phần này tính điểm.
        </p>
        <button
          onClick={startCheck}
          className="flex items-center px-10 py-5 bg-[#58cc02] text-white rounded-2xl font-black text-lg uppercase tracking-widest border-b-[6px] border-[#58a700] hover:bg-[#46a802] active:border-b-0 active:translate-y-[6px] transition-all"
        >
          Start <ArrowRight className="w-6 h-6 ml-3" strokeWidth={3} />
        </button>
      </div>
    );
  }

  // --- check ----------------------------------------------------------------
  if (phase === 'check') {
    if (!question) return null;

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans pb-40 transition-colors duration-300">
        <TopBar current={index} total={quiz.length} onQuit={quitNow} modeTitle="Vocabulary Check" />

        <div className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-4xl mx-auto">
          <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs sm:text-sm mb-6 text-center">
            Which meaning is correct? · Nghĩa nào đúng?
          </p>

          <h1 className="text-5xl sm:text-6xl font-black text-slate-800 dark:text-slate-100 tracking-tight text-center break-words px-4 capitalize mb-10">
            {question.target.word}
          </h1>

          <div className="w-full grid gap-3 sm:grid-cols-2">
            {question.options.map((opt, i) => {
              const isRight = opt.word === question.target.word;
              const isPicked = picked?.word === opt.word;

              let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 border-b-[6px] text-slate-700 dark:text-slate-200 hover:border-[#1cb0f6] active:border-b-2 active:translate-y-[4px]';
              if (picked) {
                if (isRight) style = 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]';
                else if (isPicked) style = 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]';
                else style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-50';
              }

              return (
                <button
                  key={opt.word}
                  disabled={!!picked}
                  onClick={() => answer(opt)}
                  className={`flex items-start text-left p-4 sm:p-5 rounded-2xl border-2 font-bold text-sm sm:text-base leading-snug transition-all disabled:cursor-default ${style}`}
                >
                  <span className="font-black text-xs opacity-50 mr-3 mt-0.5 flex-shrink-0">{i + 1}</span>
                  <span className="flex-1">{opt.def}</span>
                </button>
              );
            })}
          </div>
        </div>

        {picked && (
          <Feedback
            isCorrect={picked.correct}
            currentWord={question.target}
            isWordRecognition={true}
            track={track}
            unitId={unitId}
            onNext={nextCheck}
          />
        )}
      </div>
    );
  }

  // --- study ----------------------------------------------------------------
  if (!studyWord) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans selection:bg-[#1CB0F6]/20 selection:text-[#1CB0F6] pb-32 transition-colors duration-300">
      <TopBar current={index} total={pool.length} onQuit={quitNow} modeTitle="Word Study" />

      <div className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-4xl mx-auto">
        <div className="mb-8 text-center px-4 max-w-2xl">
          <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-sm sm:text-base">
            Do you already know this word? Answer honestly — this part is not scored. A check on every word follows.
          </p>
          <p className="text-slate-400 dark:text-slate-600 font-medium italic text-sm sm:text-base mt-2">
            Bạn đã biết từ này chưa? Trả lời thật lòng — phần này không tính điểm. Sau đó sẽ có bài kiểm tra.
          </p>
        </div>

        <div className="w-full flex items-center justify-center mb-12 min-h-[120px]">
          <h1 className="text-5xl sm:text-7xl font-black text-slate-800 dark:text-slate-100 tracking-tight text-center break-words px-4 capitalize">
            {studyWord.word}
          </h1>
        </div>

        <div className="flex flex-row justify-center gap-6 sm:gap-12 w-full max-w-2xl">
          <button
            disabled={revealed}
            onClick={() => rateSelf('yes')}
            className={`group flex flex-col items-center justify-center w-40 h-40 sm:w-52 sm:h-52 border-2 rounded-[2rem] transition-all bg-white dark:bg-slate-900 flex-shrink-0
              ${revealed && studyChoice !== 'yes' ? 'opacity-40 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-not-allowed'
              : 'border-slate-300 dark:border-slate-700 border-b-[8px] hover:bg-slate-50 dark:hover:bg-slate-800 active:border-b-2 active:translate-y-[6px]'}`}
          >
            <Check className={`w-16 h-16 sm:w-20 sm:h-20 mb-3 transition-colors ${revealed && studyChoice !== 'yes' ? 'text-slate-400 dark:text-slate-600' : 'text-[#58A700] group-hover:scale-110'}`} strokeWidth={4} />
            <span className={`font-black text-lg sm:text-xl uppercase tracking-widest text-center px-2 ${revealed && studyChoice !== 'yes' ? 'text-slate-400 dark:text-slate-600' : 'text-[#58A700]'}`}>Yes, I know it<br/><span className="text-sm opacity-70">(Y)</span></span>
          </button>

          <button
            disabled={revealed}
            onClick={() => rateSelf('no')}
            className={`group flex flex-col items-center justify-center w-40 h-40 sm:w-52 sm:h-52 border-2 rounded-[2rem] transition-all bg-white dark:bg-slate-900 flex-shrink-0
              ${revealed && studyChoice !== 'no' ? 'opacity-40 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-not-allowed'
              : 'border-slate-300 dark:border-slate-700 border-b-[8px] hover:bg-slate-50 dark:hover:bg-slate-800 active:border-b-2 active:translate-y-[6px]'}`}
          >
            <BookOpen className={`w-16 h-16 sm:w-20 sm:h-20 mb-3 transition-colors ${revealed && studyChoice !== 'no' ? 'text-slate-400 dark:text-slate-600' : 'text-[#1CB0F6] group-hover:scale-110'}`} strokeWidth={4} />
            <span className={`font-black text-lg sm:text-xl uppercase tracking-widest text-center px-2 ${revealed && studyChoice !== 'no' ? 'text-slate-400 dark:text-slate-600' : 'text-[#1CB0F6]'}`}>No, teach me<br/><span className="text-sm opacity-70">(N)</span></span>
          </button>
        </div>
      </div>

      {revealed && (
        <Feedback
          isCorrect={true}
          isStudy={true}
          currentWord={studyWord}
          isWordRecognition={true}
          track={track}
          unitId={unitId}
          onNext={nextStudy}
        />
      )}
    </div>
  );
}
