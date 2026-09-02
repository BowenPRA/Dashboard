import React, { useState, useEffect, useRef } from 'react';
import {
  Bot, CheckCircle2, XCircle, Award, Type, FlaskConical, FileEdit, ArrowRight,
  Clock, Lightbulb, Undo2, Redo2, Lock, ScrollText, Quote, AlertTriangle, Scale
} from 'lucide-react';
import TopBar from '../components/TopBar';
import RevisionWorkshop from './essay/RevisionWorkshop';

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

const countWords = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;

/** Splits a source into the numbered paragraphs the GED stimulus pane shows. */
const splitParagraphs = (text) =>
  String(text || '').split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean);

// Legacy (Cambridge / ESL) essays keep the old character floor.
const MIN_CHARS = 100;

// GED floors are measured in words, because the rubric is. Below 150 words the
// grader caps two of the three traits at 1 — there simply is not room to show a
// developed, organised argument — so the task stops the student before they
// spend an attempt on a response that cannot pass. When the clock has run out,
// a much lower floor applies: on test day you submit what you have.
const GED_MIN_WORDS = 150;
const GED_TIME_UP_MIN_WORDS = 40;
const GED_TARGET_WORDS = [300, 500];

/* -------------------------------------------------------------------------- *
 * How the task's 10 points are split
 *
 * A GED essay task is two pieces of work: the response, and the revision that
 * follows it. Paying only for the response says the revision is optional, and
 * anything optional after a 45-minute essay does not get done — which is a
 * shame, because for a second-language writer the revision is where most of the
 * marks on test day are actually won.
 *
 * The task still emits out of 10 (its registry nativeMax), so unit XP totals and
 * every phase gate derived from them are untouched by this split.
 * -------------------------------------------------------------------------- */
const SCORE_XP = 8;     // scaled from the /6 trait score
const REVISION_XP = 2;  // earned by making the corrections yourself

/** Full marks for a clean essay or a complete revision; half for most of one. */
const revisionXPOf = (revision) => {
  if (!revision) return 0;
  const { fixed = 0, total = 0 } = revision;
  if (total === 0 || fixed >= total) return REVISION_XP;
  if (fixed >= Math.ceil(total / 2)) return Math.round(REVISION_XP / 2);
  return 0;
};

export default function Essay({ pool, onComplete, onQuit, savedData = {}, strikes = 0, onAddStrike, track, unitTitle }) {
  const currentQ = pool?.essay || pool;

  // GED essays are graded like the real Extended Response: three traits (0-2
  // each) with no mark scheme, model answer, or corrected rewrite. Every other
  // track keeps the content/English mark-scheme flow. Declared up here so the
  // grading handlers can branch on it.
  const isGedTrack = (track || '').startsWith('GED');

  // The GED Extended Response is a timed, unaided piece of writing. Units may
  // override the limit; 45 minutes matches the real test.
  const minutesAllowed = currentQ?.minutesAllowed ?? 45;

  const [localAnswers, setLocalAnswers] = useState(savedData);
  const [gameState, setGameState] = useState('Q');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(minutesAllowed * 60);
  const [timeUp, setTimeUp] = useState(false);

  /* ---------------------------------------------------------------------- *
   * Undo / redo
   *
   * The real GED response box has an editing toolbar, and this one blocks the
   * clipboard for integrity — which also costs the student the ordinary
   * rescue of retyping something they just deleted. A small snapshot history
   * gives that back without reopening the clipboard.
   * ---------------------------------------------------------------------- */
  const commitTimer = useRef(null);
  const [editHistory, setEditHistory] = useState({ stack: [''], i: 0 });

  const HISTORY_LIMIT = 120;

  const pushHistory = (val) => setEditHistory((h) => {
    if (h.stack[h.i] === val) return h;
    const stack = h.stack.slice(0, h.i + 1).concat(val).slice(-HISTORY_LIMIT);
    return { stack, i: stack.length - 1 };
  });

  const resetHistory = (val) => {
    if (commitTimer.current) clearTimeout(commitTimer.current);
    setEditHistory({ stack: [val || ''], i: 0 });
  };

  const handleAnswerChange = (val) => {
    setUserAnswer(val);
    if (commitTimer.current) clearTimeout(commitTimer.current);
    commitTimer.current = setTimeout(() => pushHistory(val), 500);
  };

  const undo = () => {
    // Flush the in-flight edit first, so one undo steps back over it rather
    // than merely snapping to where the debounce last landed.
    if (commitTimer.current) { clearTimeout(commitTimer.current); commitTimer.current = null; }
    let { stack, i } = editHistory;
    if (stack[i] !== userAnswer) {
      stack = stack.slice(0, i + 1).concat(userAnswer).slice(-HISTORY_LIMIT);
      i = stack.length - 1;
    }
    if (i <= 0) { setEditHistory({ stack, i }); return; }
    setEditHistory({ stack, i: i - 1 });
    setUserAnswer(stack[i - 1]);
  };

  const redo = () => {
    const { stack, i } = editHistory;
    if (i >= stack.length - 1) return;
    setEditHistory({ stack, i: i + 1 });
    setUserAnswer(stack[i + 1]);
  };

  const handleKeyDown = (e) => {
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;
    const k = e.key.toLowerCase();
    if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
    else if ((k === 'z' && e.shiftKey) || k === 'y') { e.preventDefault(); redo(); }
  };

  const canUndo = editHistory.i > 0 || (editHistory.stack[editHistory.i] !== userAnswer && userAnswer !== '');
  const canRedo = editHistory.i < editHistory.stack.length - 1;

  useEffect(() => () => { if (commitTimer.current) clearTimeout(commitTimer.current); }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localAnswers[0] || savedData[0] || savedData;

    if (saved && saved.text) {
      const text = saved.text;
      const status = saved.status;

      // Restores the persisted attempt when the item changes, and (per task) also
      // scrolls, focuses, or advances the running score — side effects that have to
      // stay in an effect. Queued for the render-phase-adjustment rewrite; not worth
      // re-testing scoring mid study-block. See docs/daily-plan.md.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserAnswer(text || '');
      setFeedback(null);
      resetHistory(text || '');

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
      resetHistory('');
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

    // GED fallback keeps the trait shape so the results screen renders the same
    // way; the AI grader is off, so no traits can be awarded.
    if (isGedTrack) {
      const disabled = "The AI examiner is disabled for this unit after 3 strikes, so no marks can be awarded.";
      setFeedback({
        mode: 'ged',
        originalAnswer: trimmed,
        usedWordGroups,
        gedTraits: { arguments: 0, development: 0, conventions: 0 },
        gedTotal: 0,
        traitFeedback: { arguments: disabled, development: disabled, conventions: disabled },
        nextStep: "Reach out to your teacher to re-enable grading for this unit.",
        wordCount: countWords(trimmed),
        evidenceCited: [],
        conventionIssues: [],
        revisions: [],
        scoreNotes: [],
        nonScorableReason: '',
        isPerfect: false,
        isStrikeFallback: true
      });
      setLocalAnswers({ 0: { text: trimmed, status: 'strike_fallback' } });
      setGameState('A');
      return;
    }

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
    if (!isLengthValid) return;

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
      // GED grading judges use of the two source passages, so send them.
      sources: currentQ.sources || [],
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

    // GED tracks: pure Extended Response rubric — three traits, /6, one next step.
    if (isGedTrack && aiData.gedTraits) {
      const traits = aiData.gedTraits;
      const gedTotal = Number.isFinite(aiData.gedTotal)
        ? aiData.gedTotal
        : (traits.arguments || 0) + (traits.development || 0) + (traits.conventions || 0);
      const isPerfect = gedTotal >= 6;

      setFeedback({
        mode: 'ged',
        originalAnswer: trimmedAnswer,
        usedWordGroups,
        gedTraits: traits,
        gedTotal,
        traitFeedback: aiData.traitFeedback || {},
        nextStep: aiData.nextStep || '',
        // Everything the grader found before it scored — the student learns far
        // more from "here is the evidence you actually used" than from a number.
        wordCount: Number.isFinite(aiData.wordCount) ? aiData.wordCount : countWords(trimmedAnswer),
        paragraphs: aiData.paragraphs,
        positionStated: aiData.positionStated || '',
        evidenceCited: aiData.evidenceCited || [],
        analysisOfArgumentation: aiData.analysisOfArgumentation || '',
        conventionIssues: aiData.conventionIssues || [],
        // The same errors as applicable edits, for Part 2.
        revisions: aiData.revisions || [],
        scoreNotes: aiData.scoreNotes || [],
        nonScorableReason: aiData.nonScorableReason || '',
        isPerfect,
        isStrikeFallback: false
      });

      if (isPerfect) {
        setLocalAnswers({ 0: { text: trimmedAnswer, status: 'perfect' } });
      }
      setGameState('A');
      return;
    }

    // Every other track: content (mark scheme) + English (max 3).
    const scienceScore = aiData.scienceScore || 0;
    const englishScore = aiData.englishScore || 0;
    const scienceMarks = (currentQ.markScheme || []).map((_, i) => i < scienceScore);

    const pointsEarned = scienceScore + englishScore;
    const maxPoints = (currentQ.scienceMaxMarks || 0) + 3;
    const isPerfect = pointsEarned >= maxPoints;

    setFeedback({
      mode: 'legacy',
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

  /**
   * `revision` is the result of Part 2, or null when there was no Part 2 to do
   * (a re-entered perfect attempt, a disabled grader, a non-scorable response).
   */
  const handleNext = (revision = null) => {
    let finalXP = 0;
    let answers = localAnswers;

    if (gameState === 'SAVED_PERFECT') {
      finalXP = 10;
    } else if (feedback?.mode === 'ged') {
      // GED total is out of 6; scale to the score's share of the task's 0-10,
      // and add what the revision earned.
      finalXP = Math.round((feedback.gedTotal / 6) * SCORE_XP) + revisionXPOf(revision);
      if (revision) {
        answers = {
          0: {
            ...(localAnswers[0] || {}),
            text: feedback.originalAnswer,
            status: feedback.isPerfect ? 'perfect' : (localAnswers[0]?.status || 'graded'),
            revised: revision.revisedText,
            revisionFixed: revision.fixed,
            revisionTotal: revision.total,
          },
        };
        setLocalAnswers(answers);
      }
    } else if (feedback) {
      finalXP = Math.ceil((feedback.pointsEarned / feedback.maxPoints) * 10);
    } else if (gameState === 'SAVED_API_ERROR') {
      finalXP = 0;
    }

    onComplete(finalXP, answers);
  };

  // Part 2 runs whenever there is a real score to learn from. A disabled grader
  // or a non-scorable response has produced no usable edits, so those go
  // straight to the end rather than into an empty workshop.
  const hasRevisionStep =
    feedback?.mode === 'ged' && !feedback.isStrikeFallback && !feedback.nonScorableReason;

  // Labels adapt to the subject for the non-GED (legacy) results view. A science
  // unit gets "Science Feedback"; anything else gets neutral "Content Feedback".
  // GED essays use the trait view below and never reach these. Never surface an
  // exam board name.
  const isScienceTrack = /SCIENCE/i.test(track || '') || track === 'Y8' || track === 'Y9';
  const markSchemeTitle = 'Content Marks';
  const contentFeedbackTitle = isScienceTrack ? 'Science Feedback' : 'Content Feedback';
  const ContentIcon = isScienceTrack ? FlaskConical : Lightbulb;

  let containerClass = "w-full rounded-[1.5rem] shadow-sm border p-6 sm:p-8 mb-6 relative transition-all duration-300 ";
  let textAreaClass = "w-full h-64 text-lg font-medium bg-transparent focus:outline-none resize-none disabled:bg-transparent leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500 ";

  // The GED response box is a plain white page with a toolbar, not a card, so the
  // GED path supplies its own chrome and only borrows the state colours.
  if (isGedTrack) {
    containerClass = "w-full rounded-[1.5rem] shadow-sm border overflow-hidden mb-6 relative transition-all duration-300 ";
    textAreaClass = "w-full h-[26rem] px-6 sm:px-8 py-6 text-lg font-medium bg-transparent focus:outline-none resize-none disabled:bg-transparent leading-[1.9] placeholder:text-slate-400 dark:placeholder:text-slate-500 ";
  }

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
  const wordsTyped = countWords(userAnswer);

  // GED is gated on words against the rubric's floor; the clock running out
  // lowers the floor rather than trapping the student with nothing to submit.
  const gedFloor = timeUp ? GED_TIME_UP_MIN_WORDS : GED_MIN_WORDS;
  const isLengthValid = isGedTrack ? wordsTyped >= gedFloor : charsTyped >= MIN_CHARS;

  const timerPill = (
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
  );

  // Continuous paragraph numbering across the whole stimulus, as the test does,
  // so a student can say "paragraph 3" and mean the same thing the examiner does.
  let paraNo = 0;
  const numberedSources = (currentQ.sources || []).map((s) => ({
    ...s,
    paragraphs: splitParagraphs(s.text).map((text) => ({ n: ++paraNo, text })),
  }));

  const suggestedWordChips = (
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
  );

  const completeButton = (
    <button
      onClick={() => handleNext()}
      className="flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
    >
      Complete Section <ArrowRight className="w-6 h-6 ml-3" />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32">
      <TopBar
        current={0}
        total={1}
        onQuit={() => handleNext()}
        modeTitle={isGedTrack ? "Extended Response" : "Essay Writing"}
      />

      {/* Part 2 drops the two-pane exam layout: the sources have done their job,
          and a sentence being rewritten deserves the whole screen. */}
      {gameState === 'REVISE' ? (
        <RevisionWorkshop
          originalText={feedback?.originalAnswer || ''}
          revisions={feedback?.revisions || []}
          onBackToScore={() => setGameState('A')}
          onFinish={(revision) => handleNext(revision)}
        />
      ) : (

      <div className={`${isGedTrack ? 'max-w-[92rem]' : 'max-w-7xl'} mx-auto p-4 sm:p-6 mt-2 sm:mt-6`}>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: the stimulus pane. On GED this is a 50/50 split holding only the
              source passages, mirroring the real test's two-pane screen; the prompt
              lives with the response box on the right, where the test puts it. */}
          <div className={`w-full ${isGedTrack ? 'lg:w-1/2' : 'lg:w-1/3'} flex flex-col`}>
            {isGedTrack ? (
              <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0">
                  <div className="flex items-center text-slate-500 dark:text-slate-400">
                    <ScrollText className="w-4 h-4 mr-2" strokeWidth={2.5} />
                    <span className="text-[11px] font-black uppercase tracking-widest">Source Texts</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Scroll to read all
                  </span>
                </div>

                <div className="overflow-y-auto px-6 sm:px-8 py-6">
                  {numberedSources.map((s, i) => (
                    <div key={i} className={i > 0 ? 'mt-8 pt-8 border-t-2 border-dashed border-slate-200 dark:border-slate-800' : ''}>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1">
                        Source {i + 1}
                      </h4>
                      {s.title && (
                        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4 leading-snug">{s.title}</h3>
                      )}
                      <div className="space-y-4">
                        {s.paragraphs.map((p) => (
                          <div key={p.n} className="flex">
                            <span className="w-7 flex-shrink-0 text-xs font-black tabular-nums text-slate-300 dark:text-slate-600 pt-1 select-none">
                              {p.n}
                            </span>
                            <p className="flex-1 text-[15px] text-slate-700 dark:text-slate-300 font-medium leading-[1.8]">
                              {p.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Not part of the real test, so it sits with the passages rather
                      than beside the response box, and says so plainly. */}
                  {(currentQ.suggestedWords || []).length > 0 && gameState !== 'LOADING' && (
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">
                        Word Bank
                        <span className="normal-case tracking-normal text-slate-300 dark:text-slate-600"> · a practice aid, not on the real test</span>
                      </span>
                      {suggestedWordChips}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-2xl mb-6 font-bold tracking-widest uppercase text-sm">
                  <FileEdit className="w-5 h-5 mr-2" /> Essay Prompt
                </div>

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
            )}
          </div>

          {/* RIGHT: Interaction & Feedback */}
          <div className={`w-full ${isGedTrack ? 'lg:w-1/2' : 'lg:w-2/3'} flex flex-col`}>

            {/* GED: the prompt box sits above the response area, as on the test. */}
            {isGedTrack && (
              <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm mb-6 overflow-hidden">
                <div className="flex items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <FileEdit className="w-4 h-4 mr-2 text-slate-500 dark:text-slate-400" strokeWidth={2.5} />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Prompt</span>
                </div>
                <div className="px-6 sm:px-8 py-6">
                  <p className="text-lg font-bold text-slate-800 dark:text-white leading-relaxed">
                    {currentQ.task}
                  </p>
                  {(currentQ.guidelines || []).length > 0 && (
                    <ul className="mt-5 space-y-2 pl-1">
                      {(currentQ.guidelines || []).map((guide, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 mr-3 flex-shrink-0" />
                          <span className="text-[15px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{guide}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400 dark:text-slate-500">
                    You have {minutesAllowed} minutes. Aim for {GED_TARGET_WORDS[0]}–{GED_TARGET_WORDS[1]} words in
                    four to seven paragraphs.
                  </p>
                </div>
              </div>
            )}

            <div className={containerClass}>
              {/* GED: a toolbar strip across the top of the response box, matching
                  the test's editing bar — minus the clipboard, which stays locked. */}
              {isGedTrack && (
                <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={undo}
                      disabled={!canUndo || gameState !== 'Q'}
                      title="Undo (Ctrl+Z)"
                      className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      <Undo2 className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                    <button
                      type="button"
                      onClick={redo}
                      disabled={!canRedo || gameState !== 'Q'}
                      title="Redo (Ctrl+Y)"
                      className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      <Redo2 className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                    <span className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1.5" />
                    <span
                      title="Copy, paste and spell check are disabled, as on the real test"
                      className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500"
                    >
                      <Lock className="w-3.5 h-3.5 mr-1.5" strokeWidth={2.5} /> Exam conditions
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-black uppercase tracking-widest tabular-nums ${
                      wordsTyped >= GED_TARGET_WORDS[0]
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : wordsTyped >= GED_MIN_WORDS
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-slate-400 dark:text-slate-500'
                    }`}>
                      {wordsTyped} words
                    </span>
                    {gameState === 'Q' && timerPill}
                  </div>
                </div>
              )}

              {!isGedTrack && gameState === 'Q' && (
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Exam conditions &middot; no spell check &middot; no copy &amp; paste
                  </span>
                  {timerPill}
                </div>
              )}

              {timeUp && gameState === 'Q' && (
                <div className={`${isGedTrack ? 'mx-4 sm:mx-6 mt-4' : ''} mb-4 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800`}>
                  <p className="text-sm font-bold text-rose-700 dark:text-rose-300 leading-relaxed">
                    Time is up, just like the real test. Submit what you have written &mdash; a
                    finished-enough response always scores better than an unfinished perfect one.
                  </p>
                </div>
              )}

              <textarea
                value={userAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                onKeyDown={handleKeyDown}
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
                placeholder={
                  strikes >= 3
                    ? "AI Grader disabled. Local fallback grading only."
                    : isGedTrack
                      ? "Type your response here. Start by stating which position is better supported…"
                      : "Start writing your essay here..."
                }
                className={textAreaClass}
              />
            </div>

            {/* Legacy keeps the word chips below the answer box. */}
            {!isGedTrack && gameState !== 'LOADING' && (currentQ.suggestedWords || []).length > 0 && (
              <div className="w-full mb-8">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">
                  Suggested Vocabulary <span className="normal-case tracking-normal text-slate-300 dark:text-slate-600">· optional hints, not graded</span>
                </span>
                {suggestedWordChips}
              </div>
            )}

            {gameState === 'SAVED_PERFECT' && (
              <div className="w-full flex justify-end mb-8 border-t border-slate-200 dark:border-slate-800 pt-6 animate-in fade-in">
                 {completeButton}
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
                   <button onClick={() => handleNext()} className="flex items-center px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-orange-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm">
                     Complete Section <ArrowRight className="w-6 h-6 ml-3" />
                   </button>
                </div>
              </div>
            )}

            {(gameState === 'Q' || gameState === 'SAVED_API_ERROR') && (
              <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8 border-t border-slate-200 dark:border-slate-800 pt-6">
                {isGedTrack ? (
                  <span className={`text-sm font-bold mb-4 sm:mb-0 ${isLengthValid ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {isLengthValid
                      ? wordsTyped >= GED_TARGET_WORDS[0]
                        ? `${wordsTyped} words — a full-length response.`
                        : `${wordsTyped} words — you can submit, but ${GED_TARGET_WORDS[0]}+ scores better.`
                      : `${wordsTyped} / ${gedFloor} words minimum${timeUp ? '' : ' — shorter responses cannot reach the top bands.'}`}
                  </span>
                ) : (
                  <span className={`text-sm font-bold mb-4 sm:mb-0 ${isLengthValid ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {charsTyped} / {MIN_CHARS} characters minimum
                  </span>
                )}
                <button
                  onClick={handleGrade}
                  disabled={!isLengthValid}
                  className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] disabled:opacity-50 transition-all shadow-sm"
                >
                  {strikes >= 3 ? "Submit to Local Grader" : isGedTrack ? "Submit for Scoring" : "Submit to AI Tutor"}
                </button>
              </div>
            )}

            {gameState === 'LOADING' && (
              <div className="w-full h-40 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse mb-8">
                 <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-full mb-3">
                   <Bot className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-bounce" />
                 </div>
                 <h3 className="text-lg font-black text-slate-700 dark:text-slate-200">
                   {isGedTrack ? "The examiner is scoring your response..." : "AI Tutor is reading your essay..."}
                 </h3>
              </div>
            )}

            {/* GED tracks: the real Extended Response report — three traits scored
                0-2, the evidence the examiner actually found, /6 total, and one
                next step. No mark scheme, content/English split, model answer or
                rewrite; the test gives none of those. */}
            {gameState === 'A' && feedback?.mode === 'ged' && (
              <div className="w-full animate-in slide-in-from-bottom-8 duration-500">

                <div className="flex items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-6">
                  <div className="p-3 rounded-full mr-4 flex-shrink-0 bg-indigo-600">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                      {feedback.isStrikeFallback ? "Grader Disabled" : "Extended Response Score"}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-1">
                      Raw score
                      <span className={`ml-2 text-base ${feedback.isPerfect ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                        {feedback.gedTotal} / 6
                      </span>
                      {Number.isFinite(feedback.wordCount) && (
                        <span className="ml-3 normal-case tracking-normal text-slate-400 dark:text-slate-500">
                          · {feedback.wordCount} words
                          {Number.isFinite(feedback.paragraphs) ? ` · ${feedback.paragraphs} paragraph${feedback.paragraphs === 1 ? '' : 's'}` : ''}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {feedback.nonScorableReason && (
                  <div className="bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 p-6 rounded-[1.5rem] mb-6">
                    <div className="flex items-center text-rose-600 dark:text-rose-400 mb-2">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      <h4 className="font-black text-sm uppercase tracking-widest">Not Scorable</h4>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{feedback.nonScorableReason}</p>
                  </div>
                )}

                {/* What the examiner found before it scored anything. This is the
                    part a student can act on — a trait number alone tells them
                    nothing about which sentence lost the mark. */}
                {!feedback.isStrikeFallback && !feedback.nonScorableReason && (
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
                    <div className="flex items-center text-slate-500 dark:text-slate-400 mb-4">
                      <Quote className="w-4 h-4 mr-2" strokeWidth={2.5} />
                      <h4 className="font-black text-[11px] uppercase tracking-widest">What the examiner found</h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Your position</span>
                        <p className="text-[15px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                          {feedback.positionStated || <span className="text-rose-500 dark:text-rose-400">You never stated clearly which side was better supported.</span>}
                        </p>
                      </div>

                      <div>
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                          Evidence you used from the sources
                        </span>
                        {(feedback.evidenceCited || []).length > 0 ? (
                          <ul className="space-y-1.5">
                            {feedback.evidenceCited.map((e, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-[15px] font-medium text-slate-700 dark:text-slate-300">{e}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-[15px] font-medium text-rose-500 dark:text-rose-400">
                            None. Only evidence taken from the source texts earns marks.
                          </p>
                        )}
                      </div>

                      <div>
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                          How you judged the argumentation
                        </span>
                        <p className="text-[15px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                          {feedback.analysisOfArgumentation || (
                            <span className="text-rose-500 dark:text-rose-400">
                              You summarised both sides and chose one, but never judged how good their evidence was. This is what keeps a response at 1 instead of 2.
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  {[
                    { key: 'arguments', label: 'Creation of Arguments & Use of Evidence', hint: 'A clear position, specific evidence from the sources, and a judgement on how strong that evidence is.' },
                    { key: 'development', label: 'Development of Ideas & Structure', hint: 'Ideas elaborated, not just listed, in a clear introduction, body and conclusion.' },
                    { key: 'conventions', label: 'Clarity & Command of English Conventions', hint: 'Varied sentences, with grammar, spelling and punctuation under control.' },
                  ].map((t) => {
                    const score = feedback.gedTraits?.[t.key] ?? 0;
                    const fb = feedback.traitFeedback?.[t.key] || 'No feedback provided.';
                    const pill = score === 2
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                      : score === 1
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300';
                    const accent = score === 2 ? 'border-l-emerald-400' : score === 1 ? 'border-l-amber-400' : 'border-l-rose-400';
                    const band = score === 2 ? 'Top band' : score === 1 ? 'Partial credit' : 'No credit';
                    return (
                      <div key={t.key} className={`bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 border-l-4 ${accent} shadow-sm`}>
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <h4 className="text-lg font-black text-slate-800 dark:text-white leading-snug">{t.label}</h4>
                          <span className={`flex-shrink-0 font-bold px-3 py-1 rounded-lg text-sm tabular-nums ${pill}`}>{score} / 2</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">{band}</p>
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3">{t.hint}</p>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{fb}</p>

                        {t.key === 'conventions' && (feedback.conventionIssues || []).length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                              Errors the examiner marked
                            </span>
                            <ul className="space-y-1">
                              {feedback.conventionIssues.map((e, i) => (
                                <li key={i} className="flex items-start">
                                  <XCircle className="w-4 h-4 text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{e}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Where a rubric gate, rather than the examiner's judgement, held
                    a trait down. Saying so out loud is the difference between a
                    score that feels arbitrary and one the student can chase. */}
                {(feedback.scoreNotes || []).length > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-[1.5rem] mb-6">
                    <div className="flex items-center text-amber-700 dark:text-amber-400 mb-3">
                      <Scale className="w-5 h-5 mr-2" />
                      <h4 className="font-black text-sm uppercase tracking-widest">Why marks were capped</h4>
                    </div>
                    <ul className="space-y-2">
                      {feedback.scoreNotes.map((n, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 mr-3 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {feedback.nextStep && (
                  <div className="bg-[#eff6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-800 p-6 rounded-[1.5rem] mb-8">
                    <div className="flex items-center text-[#2563eb] dark:text-blue-400 mb-2">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      <h4 className="font-black text-sm uppercase tracking-widest">Your Next Step</h4>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{feedback.nextStep}</p>
                  </div>
                )}

                {/* The report is only half the task. Reading "watch your verb
                    endings" changes nothing; Part 2 is where the student
                    actually rewrites the sentences that lost the marks. */}
                {hasRevisionStep ? (
                  <div className="bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-900 p-6 sm:p-8 rounded-[1.5rem] shadow-sm mb-8">
                    <span className="block text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
                      Part 2 of 2 · Revision
                    </span>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-white leading-snug mb-2">
                      {(feedback.revisions || []).length > 0
                        ? `Now fix the ${feedback.revisions.length} mistake${feedback.revisions.length === 1 ? '' : 's'} the examiner marked`
                        : 'Now take your essay away'}
                    </h4>
                    <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-2xl">
                      {(feedback.revisions || []).length > 0
                        ? 'You will be shown exactly what is wrong and exactly what to write instead, one sentence at a time. Rewrite each one and you finish with a corrected essay you can copy out — and the last of this task’s marks.'
                        : 'The examiner found no errors worth correcting. Collect your essay and the last of this task’s marks.'}
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setGameState('REVISE')}
                        className="flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                      >
                        Start Part 2 <ArrowRight className="w-6 h-6 ml-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800 mb-8">
                    {completeButton}
                  </div>
                )}

              </div>
            )}

            {/* Every other track: the existing content + English mark-scheme flow. */}
            {gameState === 'A' && feedback && feedback.mode !== 'ged' && (
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
                   {completeButton}
                </div>

              </div>
            )}

          </div>
        </div>
      </div>

      )}
    </div>
  );
}
