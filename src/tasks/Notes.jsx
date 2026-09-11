import React, { useState, useEffect, useRef, Component } from 'react';
import {
  ChevronRight, ChevronLeft, BookOpen, Scale, Target,
  MessageSquare, ShieldCheck, CheckCircle2, Construction,
  PlayCircle, PauseCircle, Maximize2, X, Pencil, MonitorPlay, Minimize2,
  Volume2, Repeat, AlertTriangle, UserCheck, HelpCircle, Equal, Scissors, Users
} from 'lucide-react';

import TopBar from '../components/TopBar';
import WidgetRenderer from '../components/WidgetRenderer';
import { SlideLayout } from '../components/notes/layouts';
import ActivityBlock from '../components/notes/ActivityBlock';
import { isLayout } from '../components/notes/layouts/helpers.jsx';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';

const IconMap = {
  BookOpen, Scale, Target, MessageSquare, ShieldCheck,
  Repeat, AlertTriangle, UserCheck, HelpCircle, Equal, Scissors, Users,
};


class WidgetErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Interactive Widget Crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-slate-700 text-center animate-in fade-in">
          <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-3 shadow-inner">
            <Construction className="w-6 h-6 text-rose-500 dark:text-rose-400" strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-black text-slate-700 dark:text-slate-200 mb-1 tracking-tight">Widget Unavailable</h3>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-[250px]">
            This interactive tool encountered an error. Please continue with the lesson.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * The check question a slide can carry: predict → answer → reveal.
 *
 * This is what the Notes task is scored on. Reaching the last slide used to pay
 * full marks, which taught the student that clicking Next is the goal; the deck
 * now has to ask, and the answer has to be right.
 */
function CheckBlock({ check, lang, answer, onAnswer, isDisplayMode, parseText, compact = false, side = false }) {
  const question = lang === 'vn' ? (check.qVn || check.q) : check.q;
  const explanation = lang === 'vn' ? (check.expVn || check.expEn) : (check.expEn || check.expVn);

  // `compact` is used when the check sits in the layout slide's own footer bar,
  // which already frames it — so drop the top margin, the tinted box and the
  // extra padding, and shrink the options, keeping the answer section small.
  const shell = compact
    ? ''
    : `mt-6 shrink-0 rounded-2xl lg:rounded-[1.75rem] border-2 border-[#1cb0f6]/40 bg-[#1cb0f6]/[0.07] dark:bg-[#1cb0f6]/[0.1] ${isDisplayMode ? 'p-[clamp(1.25rem,2vw,2rem)]' : 'p-4 lg:p-6'}`;
  const optPad = compact ? 'p-2.5 lg:p-3 text-sm' : (isDisplayMode ? 'p-[clamp(0.9rem,1.3vw,1.25rem)] text-[clamp(1rem,1.5vw,1.3rem)]' : 'p-3 lg:p-4 text-sm lg:text-base');

  return (
    <div className={shell}>
      <div className={`flex items-center text-[#1899d6] dark:text-[#5cc8ff] font-black uppercase tracking-widest ${compact ? 'mb-2' : 'mb-3'} ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)]' : 'text-[10px] lg:text-xs'}`}>
        <HelpCircle className={isDisplayMode ? 'w-5 h-5 mr-2' : 'w-4 h-4 mr-2'} strokeWidth={3} />
        {lang === 'vn' ? 'Kiểm tra nhanh' : 'Quick Check'}
      </div>

      <div className={`font-black text-slate-800 dark:text-slate-100 leading-snug ${compact ? 'mb-2.5' : 'mb-4'} ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-[15px] sm:text-base lg:text-lg'}`}>
        {parseText(question)}
      </div>

      {/* In the side panel the options stack in one column: two columns of
          sentence-length options in a 24rem strip wrap into ragged slivers. */}
      <div className={`grid gap-2 ${side ? 'sm:grid-cols-2 lg:grid-cols-1' : 'sm:grid-cols-2'}`}>
        {(check.options || []).map((opt) => {
          const label = lang === 'vn' ? (opt.textVn || opt.text) : opt.text;
          const isRight = opt.val === check.correct;
          const picked = answer?.val === opt.val;

          let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 border-b-[4px] text-slate-700 dark:text-slate-200 hover:border-[#1cb0f6] active:border-b-2 active:translate-y-[2px]';
          if (answer) {
            if (isRight) style = 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]';
            else if (picked) style = 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]';
            else style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60';
          }

          return (
            <button
              key={opt.val}
              disabled={!!answer}
              onClick={() => onAnswer(opt)}
              className={`flex items-start text-left rounded-xl border-2 font-bold transition-all disabled:cursor-default ${style} ${optPad}`}
            >
              <span className="font-black uppercase tracking-widest opacity-60 mr-2.5 mt-0.5">{opt.val}</span>
              <span className="flex-1">{parseText(label)}</span>
            </button>
          );
        })}
      </div>

      {answer && (
        <div className={`rounded-xl border-2 ${compact ? 'mt-2.5' : 'mt-4'} ${answer.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'} ${isDisplayMode ? 'p-[clamp(1rem,1.5vw,1.5rem)]' : (compact ? 'p-3' : 'p-4')}`}>
          <div className={`flex items-center font-black uppercase tracking-widest mb-1.5 ${answer.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'} ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)]' : 'text-[10px] lg:text-xs'}`}>
            {answer.correct
              ? <><CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} />{lang === 'vn' ? 'Chính xác' : 'Correct'}</>
              : <><AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />{lang === 'vn' ? 'Chưa đúng' : 'Not quite'}</>}
          </div>
          <div className={`font-bold leading-relaxed ${answer.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'} ${isDisplayMode ? 'text-[clamp(1rem,1.5vw,1.3rem)]' : 'text-sm lg:text-base'}`}>
            {parseText(explanation)}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * The resume blob Notes keeps in `progress[...].answers`:
 *   { slide, total, checks: { [slideIndex]: { val, correct } } }
 * `total` guards the restore — if the deck has been re-authored to a different
 * length since the save, the slide position and the check answers no longer
 * line up with the slides they were made on, so both are dropped.
 */
const restoreFrom = (saved, slides) => {
  const total = slides?.length || 0;
  if (!saved || typeof saved !== 'object' || saved.total !== total) return { slide: 0, checks: {} };
  const slide = Math.min(Math.max(Number(saved.slide) || 0, 0), Math.max(total - 1, 0));
  const checks = saved.checks && typeof saved.checks === 'object' ? saved.checks : {};
  return { slide, checks };
};

// Activities that read fine in a column beside the slide. A number line needs
// the full width to be tappable, so it keeps the footer under the slide.
const SIDE_ACTIVITIES = new Set(['predict', 'sort', 'order', 'estimate', 'hotspot', 'plot', 'reflect']);

export default function Notes({ slides, onComplete, onProgress, onQuit, savedData, bilingual = true }) {
  // Resume where the student left off. Students routinely close a deck part
  // way through (the tablet sleeps, the lesson ends, they tap the X), and
  // before this every slide read and every check answered was thrown away.
  const restored = restoreFrom(savedData, slides);

  const [currentIndex, setCurrentIndex] = useState(restored.slide);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [lang, setLang] = useState('en');
  const [isDisplayMode, setIsDisplayMode] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [checkAnswers, setCheckAnswers] = useState(restored.checks); // slide index -> { val, correct }
  // Show "picked up where you left off" until the student moves on.
  const [resumedAt, setResumedAt] = useState(restored.slide > 0 ? restored.slide : null);

  const audioRef = useRef(null);
  const activeAudioUrl = useRef(null);
  const containerRef = useRef(null);
  // The furthest slide this session has reached, so a checkpoint saved from
  // an earlier slide (after paging back) never moves the resume point backwards.
  const [furthest, setFurthest] = useState(restored.slide);

  const stopAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch(e) {
        console.warn("Audio cleanup error:", e);
      }
    }
    setIsPlayingAudio(false);
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  // Changing slide must stop the previous slide's narration. Pausing an <audio>
  // element is a side effect on an external system, so it belongs in an effect;
  // the flagged setState is `stopAudio` clearing the play/pause icon.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    stopAudio();
  }, [currentIndex]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsDisplayMode(false);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    let timeout;
    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      if (isDisplayMode) {
        timeout = setTimeout(() => setIsIdle(true), 3000);
      }
    };

    if (isDisplayMode) {
      handleActivity();
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);
      window.addEventListener('touchstart', handleActivity);
    } else {
      // Leaving display mode must clear the idle overlay. Cheap, runs only on the
      // mode flip, and there is no render-phase equivalent — `isDisplayMode` is
      // this component's own state, not a prop it can derive from.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsIdle(false);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [isDisplayMode]);

  const toggleDisplayMode = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current?.requestFullscreen();
        setIsDisplayMode(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsDisplayMode(false);
      }
    }
  };

  // Every scored item in the deck — a `check` question or an interactive
  // `activity` (sort/order/estimate/hotspot/predict) — with the slide it sits
  // on. Both score alike: one item, right or wrong.
  const checks = (slides || [])
    .map((slide, i) => (slide?.check || slide?.activity
      ? { i, check: slide.check || null, activity: slide.activity || null }
      : null))
    .filter(Boolean);

  // A slide's check or activity must be finished before it can be left behind —
  // the reveal is the teaching, so skipping past it would skip the point.
  const pendingCheck = !!(slides?.[currentIndex]?.check || slides?.[currentIndex]?.activity)
    && !checkAnswers[currentIndex];

  // An activity reports its result once (`{ done, correct, ... }`); it is kept
  // in the same per-slide map as the check answers so resume covers both.
  const finishActivity = (index, result) => {
    if (checkAnswers[index]) return;
    const next = { ...checkAnswers, [index]: { ...result, correct: !!result?.correct } };
    setCheckAnswers(next);
    checkpoint(next, Math.max(furthest, index));
  };

  // Notes is a native-10 task (taskRegistry), so score out of 10. A deck with
  // no check questions pays on completion only, so decks written before checks
  // existed keep their XP until they are authored with them.
  const scoreOf = (answers, finished) => {
    if (!checks.length) return finished ? 10 : 0;
    const right = checks.filter(({ i }) => answers[i]?.correct).length;
    return Math.round((right / checks.length) * 10);
  };
  const itemsOf = (answers) => checks.map(({ i, check, activity }) => ({
    itemId: check?.id || activity?.id || `slide-${i + 1}`,
    correct: !!answers[i]?.correct,
  }));
  const blobOf = (answers, slide) => ({ slide, total: slides?.length || 0, checks: answers });

  // A checkpoint: persist the score so far and where to resume, without
  // logging an attempt. Undefined in the dev harnesses.
  const checkpoint = (answers, slide) => {
    onProgress?.(scoreOf(answers, false), blobOf(answers, slide));
  };

  const answerCheck = (index, option, check) => {
    if (checkAnswers[index]) return;
    const next = { ...checkAnswers, [index]: { val: option.val, correct: option.val === check.correct } };
    setCheckAnswers(next);
    checkpoint(next, Math.max(furthest, index));
  };

  const leaveScreen = () => {
    stopAudio();
    if (document.fullscreenElement) document.exitFullscreen();
  };

  const handleComplete = () => {
    leaveScreen();
    if (typeof onComplete !== 'function') return;
    // Finishing resets the resume point, so the next open starts at the top
    // with fresh checks: `current` keeps the best score, so a re-read can only
    // help, and a check answered wrong is worth answering again.
    onComplete(scoreOf(checkAnswers, true), blobOf({}, 0), { items: itemsOf(checkAnswers) });
  };

  // The X button SAVES. A student who has answered a check gets the same
  // save a finished deck gets (one attempt, the per-item log); one who has
  // only read ahead keeps their place without logging a zero-score attempt.
  const handleQuit = () => {
    leaveScreen();
    const answered = Object.keys(checkAnswers).length > 0;
    const slide = Math.max(furthest, currentIndex);
    if (answered && typeof onComplete === 'function') {
      onComplete(scoreOf(checkAnswers, false), blobOf(checkAnswers, slide), { items: itemsOf(checkAnswers) });
      return;
    }
    if (slide > 0) checkpoint(checkAnswers, slide);
    if (typeof onQuit === 'function') onQuit();
  };

  // "Start over": back to slide one with the checks cleared, and the saved
  // resume point cleared with them so a reload does not bring the old answers back.
  const restart = () => {
    stopAudio();
    setFurthest(0);
    setResumedAt(null);
    setCheckAnswers({});
    setCurrentIndex(0);
    checkpoint({}, 0);
  };

  const goTo = (index) => {
    setResumedAt(null);
    setCurrentIndex(index);
    if (index > furthest) {
      setFurthest(index);
      // Reaching a new slide is progress worth keeping: save the position so
      // closing the tab mid-deck reopens on this slide, not slide one.
      checkpoint(checkAnswers, index);
    }
  };

  const handleNext = () => {
    if (pendingCheck) return;
    if (currentIndex < slides.length - 1) {
      goTo(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) goTo(currentIndex - 1);
  };

  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape' && zoomedImage) {
        setZoomedImage(null);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleDisplayMode();
      }
    };
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
    // checkAnswers: answering the check on the current slide unblocks Enter/→,
    // and the listener has to be rebuilt to see it.
  }, [currentIndex, slides?.length, zoomedImage, checkAnswers]); // eslint-disable-line react-hooks/exhaustive-deps -- handleNext/handlePrev are stable navigation, re-binding the key listener each render is worse

  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 transition-colors">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <Construction className="w-8 h-8 text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2 tracking-tight">Notes Unavailable</h2>
        <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-800 mb-6 text-sm font-bold text-slate-500 dark:text-slate-400">
          No lecture slides have been configured for this module yet.
        </div>
        <button onClick={handleQuit} className="px-6 py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px] transition-all">
          Return to Dashboard
        </button>
      </div>
    );
  }
  
  const currentSlide = slides[currentIndex];
  const slideTitle = lang === 'vn' ? (currentSlide.titleVn || currentSlide.title) : currentSlide.title;
  const slideSubtitle = lang === 'vn' ? (currentSlide.subtitleVn || currentSlide.subtitle) : currentSlide.subtitle;
  const slideObjective = lang === 'vn' ? (currentSlide.objectiveVn || currentSlide.objective) : currentSlide.objective;
  const slideWarmUp = lang === 'vn' ? (currentSlide.warmUpVn || currentSlide.warmUp) : currentSlide.warmUp;
  
  const slideContent = lang === 'vn' ? (currentSlide.contentVn || currentSlide.content) : currentSlide.content;
  const slideExample = lang === 'vn' ? (currentSlide.exampleVn || currentSlide.example) : currentSlide.example;
  
  const hasContent = !!slideContent;
  const hasExample = !!slideExample;
  const hasDiagram = !!currentSlide.widget || !!currentSlide.image || !!currentSlide.inlineSvg;

  const slideCheck = currentSlide.check || null;
  const slideAnswer = checkAnswers[currentIndex] || null;

  // Flexible lesson layouts ported from the classroom Lessons project. A slide
  // with a `layout` renders through one of these; slides with only a `type`
  // (intro/concept/summary/warmup) keep the legacy renderer below untouched.
  const hasLayout = isLayout(currentSlide.layout);
  const pick = (en, vn) => (lang === 'vn' ? (vn ?? en) : en);
  const layoutCtx = { pick, lang, isDisplayMode, onZoom: setZoomedImage };

  const showExampleOnRight = hasExample && !hasDiagram;
  const rightPanelExists = hasDiagram || showExampleOnRight;

  // Where a layout slide's check or activity sits. Under the slide it used to
  // take up to 40% (check) or 62% (activity) of the card, which on a 720px
  // laptop screen left a showcase diagram twenty pixels tall. Laptops are
  // wide and short, so from lg the question moves BESIDE the slide and the
  // slide keeps its full height; narrower screens keep the footer.
  const slideActivity = !slideCheck && currentSlide.activity ? currentSlide.activity : null;
  const sidePanel = hasLayout && (!!slideCheck || (slideActivity && SIDE_ACTIVITIES.has(slideActivity.type)));

  const labelEn = currentSlide.exampleLabel || 'Example';
  const labelVn = currentSlide.exampleLabelVn || currentSlide.exampleLabel || 'Ví Dụ';
  const displayLabel = lang === 'vn' ? labelVn : labelEn;

  const toggleAudio = (audioUrl) => {
    if (!audioUrl) return;
    try {
      // 1. Force the base to be an absolute path (e.g., "Dashboard/" becomes "/Dashboard/")
      let base = import.meta.env.BASE_URL || '/';
      if (!base.startsWith('/')) base = `/${base}`;
      if (!base.endsWith('/')) base = `${base}/`;

      // 2. Prevent "double-dipping" if the audioUrl somehow already includes the base
      let path = audioUrl;
      
      // Check if path already starts with /Dashboard/ and strip it back to /
      if (base !== '/' && path.startsWith(base)) {
        path = path.replace(base, '/');
      } else if (base !== '/' && path.startsWith(base.slice(0, -1))) {
        // Catch the edge case where it starts with /Dashboard (no trailing slash)
        path = path.replace(base.slice(0, -1), '/');
      }

      // 3. Construct a guaranteed absolute URL
      const cleanUrl = path.startsWith('/') 
        ? `${base}${path.slice(1)}`
        : `${base}${path}`;

      if (isPlayingAudio && audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        if (!audioRef.current || activeAudioUrl.current !== cleanUrl) {
          if (audioRef.current) {
             audioRef.current.pause();
             audioRef.current.src = ""; // Hard unload of the old track
          }
          audioRef.current = new Audio(cleanUrl);
          activeAudioUrl.current = cleanUrl;
          audioRef.current.onended = () => setIsPlayingAudio(false);
          audioRef.current.onerror = (e) => console.error("Audio failed to load from:", cleanUrl, e);
        }
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlayingAudio(true)).catch(error => {
            console.warn("Audio playback prevented by browser autoplay policies.", error);
            setIsPlayingAudio(false);
          });
        }
      }
    } catch (e) {
      console.warn("Audio interaction failed completely:", e);
      setIsPlayingAudio(false);
    }
  };

  const parseInlineText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const innerText = part.slice(2, -2);
        const mathParts = innerText.split(/(\$[\s\S]+?\$)/g);
        
        return (
          <strong key={`bold-${i}`} className="font-black text-slate-900 dark:text-slate-100">
            {mathParts.map((m, j) => {
              if (m.startsWith('$') && m.endsWith('$')) {
                return <SafeInlineMath key={`m-${j}`} math={m.slice(1, -1).trim()} />;
              }
              return <span key={`t-${j}`}>{m}</span>;
            })}
          </strong>
        );
      }
      
      const mathParts = part.split(/(\$[\s\S]+?\$)/g);
      return mathParts.map((m, j) => {
        if (m.startsWith('$') && m.endsWith('$')) {
          return <SafeInlineMath key={`m-${i}-${j}`} math={m.slice(1, -1).trim()} />;
        }
        return <span key={`t-${i}-${j}`}>{m}</span>;
      });
    });
  };

  const renderContent = (text, isExample = false) => {
    if (!text || typeof text !== 'string') return null;

    const blockParts = text.split(/(\$\$[\s\S]+?\$\$)/g);
    const elements = [];
    let groupedBumpers = [];

    const flushBumpers = () => {
      if (groupedBumpers.length > 0) {
        elements.push(
          <div key={`bumper-${elements.length}`} className={`my-4 bg-[#ffc800]/10 dark:bg-amber-900/10 border-l-[6px] border-[#ffc800] p-4 sm:p-5 rounded-r-2xl relative animate-in fade-in transition-all ${isDisplayMode ? 'ml-[clamp(1rem,1.5vw,1.5rem)]' : 'ml-0'}`}>
            <div className={`absolute ${isDisplayMode ? '-left-[18px] top-4 p-1.5' : '-left-[14px] top-4 p-1.5'} bg-[#ffc800] text-amber-950 rounded-full shadow-sm border-[2px] border-white dark:border-slate-900 z-10`}>
              <Pencil className={isDisplayMode ? "w-5 h-5" : "w-4 h-4"} strokeWidth={3} />
            </div>
            <div className={`space-y-3 ${isDisplayMode ? 'ml-3' : 'ml-3'}`}>
              {groupedBumpers.map((line, idx) => (
                <p key={idx} className={`text-amber-950 dark:text-amber-200 font-bold leading-relaxed ${isDisplayMode ? 'text-[clamp(1.15rem,1.8vw,1.6rem)]' : 'text-sm sm:text-base lg:text-lg'}`}>
                  {parseInlineText(line)}
                </p>
              ))}
            </div>
          </div>
        );
        groupedBumpers = [];
      }
    };

    blockParts.forEach((blockPart, i) => {
      if (blockPart.startsWith('$$') && blockPart.endsWith('$$')) {
        flushBumpers();
        const mathExpression = blockPart.slice(2, -2).trim();
        
        elements.push(
          <div key={`math-block-${i}`} className={`w-full text-slate-800 dark:text-slate-100 ${isDisplayMode ? 'text-4xl' : 'text-xl lg:text-2xl'}`}>
            <SafeBlockMath math={mathExpression} />
          </div>
        );
      } else {
        const lines = blockPart.split('\n');
        lines.forEach((line, j) => {
          if (!line.trim()) {
            flushBumpers();
            elements.push(<div key={`space-${i}-${j}`} className={isDisplayMode ? "h-[clamp(0.75rem,1.5vh,1.5rem)]" : "h-3"} />);
          } else if (line.trim().startsWith('>')) {
            groupedBumpers.push(line.replace('>', '').trim());
          } else {
            flushBumpers();
            elements.push(
              <p key={`p-${i}-${j}`} className={`${isExample ? 'mb-1' : 'mb-3'} text-slate-700 dark:text-slate-300 font-medium ${isDisplayMode ? 'text-[clamp(1rem,1.8vw,1.6rem)] leading-relaxed tracking-tight' : 'text-[15px] sm:text-base lg:text-lg leading-relaxed'}`}>
                {parseInlineText(line)}
              </p>
            );
          }
        });
      }
    });
    
    flushBumpers(); 
    return elements;
  };

  return (
    <div 
      ref={containerRef} 
      className={`h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-100 overflow-hidden relative transition-colors duration-300 ${isDisplayMode && isIdle ? 'cursor-none' : ''}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(148, 163, 184, 0.3); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(71, 85, 105, 0.4); }
      `}} />

      {!isDisplayMode && (
        <TopBar 
          onQuit={handleQuit} 
          current={currentIndex + 1} 
          total={slides.length} 
          modeTitle="Lesson Notes" 
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex justify-center items-center z-10 overflow-hidden relative min-h-0 ${isDisplayMode ? 'p-0' : 'p-2.5 sm:p-4 lg:p-5'}`}>

        {/* Animated Wrapper for Cross-fade on slide change. A layout slide
            with a side panel lays out as a row from lg; the legacy `type`
            slides render header + body as siblings, so they must stay a
            column. */}
        <div
          key={currentIndex}
          className={`w-full max-h-full flex flex-col bg-white dark:bg-slate-900 overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-[0.98]
          ${sidePanel ? 'lg:flex-row' : ''}
          ${isDisplayMode
            ? 'h-full max-w-none rounded-none border-0'
            : `rounded-2xl lg:rounded-3xl shadow-sm border-2 border-slate-200 dark:border-slate-800 h-full ${(rightPanelExists || hasLayout) ? 'max-w-7xl' : 'max-w-4xl'}`
          }`}
        >

          {hasLayout && (
            <>
              <div className="flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden relative">
                <SlideLayout name={currentSlide.layout} slide={currentSlide} ctx={layoutCtx} />
                {/* Autonomous narration for layout slides lives in the bottom
                    bar (the Listen button beside Project). It used to float
                    over the slide's bottom-right corner, where it sat on top
                    of showcase captions and the last line of every statement. */}
              </div>
              {/* The check, or the activity: a footer under the slide on a
                  phone or tablet (capped so the slide keeps at least half the
                  card), a column beside it from lg. An activity's column is
                  wider than a check's — a sort has bins, a plot has a grid. */}
              {slideCheck && (
                <div className={`shrink-0 max-h-[50%] overflow-y-auto custom-scrollbar border-t-2 border-[#1cb0f6]/30 bg-[#1cb0f6]/[0.05] dark:bg-[#1cb0f6]/[0.08] px-4 sm:px-6 py-3
                  lg:max-h-none lg:h-auto lg:w-[34%] lg:max-w-[26rem] lg:border-t-0 lg:border-l-2 lg:px-5 lg:py-5 lg:flex lg:flex-col`}>
                  {/* my-auto, not justify-center: centring a scroll box's
                      content clips its top once it overflows. */}
                  <div className="w-full lg:my-auto">
                    <CheckBlock
                      check={slideCheck}
                      lang={lang}
                      answer={slideAnswer}
                      onAnswer={(opt) => answerCheck(currentIndex, opt, slideCheck)}
                      isDisplayMode={isDisplayMode}
                      parseText={parseInlineText}
                      compact
                      side
                    />
                  </div>
                </div>
              )}
              {slideActivity && (
                <div className={`shrink-0 max-h-[55%] overflow-y-auto custom-scrollbar border-t-2 border-[#1cb0f6]/30 bg-[#1cb0f6]/[0.05] dark:bg-[#1cb0f6]/[0.08] px-4 sm:px-6 py-3
                  ${sidePanel ? 'lg:max-h-none lg:h-auto lg:w-[42%] lg:max-w-[34rem] lg:border-t-0 lg:border-l-2 lg:px-5 lg:py-5 lg:flex lg:flex-col' : 'lg:px-8'}`}>
                  <div className="w-full lg:my-auto">
                    <ActivityBlock
                      activity={slideActivity}
                      lang={lang}
                      result={slideAnswer}
                      onResult={(res) => finishActivity(currentIndex, res)}
                      parseText={parseInlineText}
                      isDisplayMode={isDisplayMode}
                      side={sidePanel}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {!hasLayout && currentSlide.type === 'intro' && (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white ${currentSlide.color || 'bg-[#1cb0f6] dark:bg-[#1899d6]'} overflow-y-auto min-h-0`}>
              <div className={`bg-white/20 mx-auto rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border-[4px] border-white/30 ${isDisplayMode ? 'w-32 h-32' : 'w-24 h-24'}`}>
                <BookOpen className={`opacity-100 ${isDisplayMode ? 'w-16 h-16' : 'w-12 h-12'}`} strokeWidth={2.5} />
              </div>
              {currentSlide.unit && (
                <div className={`inline-block bg-white/20 text-white font-black uppercase tracking-[0.2em] rounded-full mb-5 border border-white/30 shadow-inner ${isDisplayMode ? 'text-[clamp(0.9rem,1.4vw,1.4rem)] px-6 py-2' : 'text-xs sm:text-sm px-4 py-1.5'}`}>
                  {currentSlide.unit}
                </div>
              )}
              <h1 className={`font-black tracking-tight mb-6 drop-shadow-md leading-tight ${isDisplayMode ? 'text-[clamp(3rem,6vw,7rem)]' : 'text-4xl lg:text-6xl'}`}>
                {slideTitle || 'Introduction'}
              </h1>
              {slideObjective ? (
                <div className={`bg-white/15 backdrop-blur-sm rounded-2xl border-2 border-white/25 shadow-inner max-w-3xl mx-auto ${isDisplayMode ? 'px-8 py-6' : 'px-5 py-4'}`}>
                  <div className={`font-black uppercase tracking-[0.2em] opacity-80 mb-1.5 ${isDisplayMode ? 'text-[clamp(0.8rem,1.1vw,1.1rem)]' : 'text-[10px] sm:text-xs'}`}>
                    {lang === 'vn' ? 'Mục tiêu' : 'Objective'}
                  </div>
                  <p className={`font-bold opacity-95 drop-shadow-sm leading-snug ${isDisplayMode ? 'text-[clamp(1.4rem,2.6vw,2.6rem)]' : 'text-lg lg:text-2xl'}`}>
                    {slideObjective}
                  </p>
                </div>
              ) : (
                <p className={`font-bold opacity-90 drop-shadow-sm max-w-4xl mx-auto ${isDisplayMode ? 'text-[clamp(1.5rem,3vw,3rem)]' : 'text-xl lg:text-2xl'}`}>
                  {slideSubtitle}
                </p>
              )}

              {slideWarmUp && (
                <div className={`bg-white rounded-2xl shadow-xl border-2 border-amber-300 text-left max-w-3xl mx-auto ${isDisplayMode ? 'mt-8 px-8 py-6' : 'mt-6 px-5 py-4'}`}>
                  <div className={`flex items-center gap-2 text-amber-600 font-black uppercase tracking-[0.15em] mb-2 ${isDisplayMode ? 'text-[clamp(0.8rem,1.1vw,1.15rem)]' : 'text-[11px] sm:text-xs'}`}>
                    <Pencil className={isDisplayMode ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />
                    {lang === 'vn' ? 'Khởi động · Làm ngay vào vở' : 'Warm-Up · Do this now in your book'}
                  </div>
                  <div className={`font-bold text-slate-800 leading-snug ${isDisplayMode ? 'text-[clamp(1.3rem,2.4vw,2.4rem)]' : 'text-lg lg:text-2xl'}`}>
                    {parseInlineText(slideWarmUp)}
                  </div>
                </div>
              )}

              {!isDisplayMode && currentSlide.audio && (
                 <button onClick={() => {
                      toggleAudio(currentSlide.audio);
                    }} className="mt-12 mx-auto flex items-center bg-white text-slate-800 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-md border-b-[4px] border-slate-200 active:border-b-0 active:translate-y-[4px] px-6 py-3 text-sm">
                   {isPlayingAudio ? <PauseCircle className="w-6 h-6 mr-3 text-slate-800" /> : <PlayCircle className="w-6 h-6 mr-3 text-slate-800" />}
                   {isPlayingAudio ? "Stop Audio" : "Listen"}
                 </button>
              )}
            </div>
          )}

          {currentSlide.type === 'concept' && (() => {
            const SlideIcon = IconMap[currentSlide.icon] || BookOpen;
            const themeColor = currentSlide.color || 'bg-[#1cb0f6]';

            return (
              <>
                {/* Header Banner */}
                <div className={`${themeColor} ${isDisplayMode ? 'p-2 sm:p-3 lg:p-4' : 'p-4 lg:p-6'} text-white flex items-center relative overflow-hidden flex-shrink-0 border-b-4 border-black/10 transition-all`}>
                  <div className={`bg-white/20 rounded-xl mr-3 sm:mr-4 shadow-inner border border-white/30 z-10 ${isDisplayMode ? 'p-2' : 'p-2.5 lg:p-3'}`}>
                    <SlideIcon className={`drop-shadow-sm ${isDisplayMode ? 'w-6 h-6' : 'w-5 h-5 lg:w-8 lg:h-8'}`} strokeWidth={2.5} />
                  </div>
                  <h2 className={`font-black tracking-tight z-10 relative drop-shadow-md pr-16 sm:pr-64 ${isDisplayMode ? 'text-[clamp(1.25rem,2vw,2rem)]' : 'text-xl sm:text-2xl lg:text-4xl'}`}>
                    {slideTitle || 'Concept'}
                  </h2>
                  
                  {!isDisplayMode && currentSlide.audio && (
                    <button 
                      onClick={() => {
                        // eslint-disable-next-line react-hooks/refs -- runs on click, never during render
                        toggleAudio(currentSlide.audio);
                      }}
                      className="ml-auto z-10 bg-white/20 hover:bg-white/30 transition-colors rounded-xl shadow-sm border border-white/30 active:scale-95 border-b-[4px] active:border-b-[1px] active:translate-y-[3px] p-2 lg:p-3"
                    >
                      {isPlayingAudio ? <PauseCircle className="drop-shadow-sm w-6 h-6 lg:w-7 lg:h-7" /> : <PlayCircle className="drop-shadow-sm w-6 h-6 lg:w-7 lg:h-7" />}
                    </button>
                  )}
                </div>
                
                {/* Content Body */}
                <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
                  
                  {/* Left Panel: Primary Content, Inline Examples & the Check */}
                  {(hasContent || (hasExample && hasDiagram) || slideCheck) && (
                    <div className={`flex-none h-[45%] lg:h-auto lg:flex-1 flex flex-col overflow-y-auto custom-scrollbar border-b-2 lg:border-b-0 border-slate-100 dark:border-slate-800 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-4 sm:p-6 lg:p-10'} ${rightPanelExists ? 'lg:border-r-2 lg:w-[45%]' : 'w-full max-w-4xl mx-auto'}`}>
                      
                      {hasContent && <div className={hasExample && hasDiagram ? "pb-4 lg:pb-6" : ""}>{renderContent(slideContent)}</div>}
                      
                      {/* Only render example on Left side if the Right side is occupied by a Diagram */}
                      {hasExample && hasDiagram && (
                        <div className={`bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl lg:rounded-3xl relative shadow-sm shrink-0 ${isDisplayMode ? 'mt-6 p-[clamp(1.25rem,2vw,2rem)]' : 'mt-6 lg:mt-8 p-4 lg:p-6'}`}>
                          <div className={`absolute -top-3.5 lg:-top-4 left-4 lg:left-6 ${themeColor} text-white font-black uppercase tracking-widest rounded-lg lg:rounded-xl shadow-sm ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[9px] lg:text-xs px-3 lg:px-4 py-1'}`}>
                            {displayLabel}
                          </div>
                          
                          <div className={`font-bold text-slate-800 dark:text-slate-200 mt-1 lg:mt-2 leading-relaxed ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-sm sm:text-base lg:text-xl'}`}>
                            {renderContent(slideExample, true)}
                          </div>
                        </div>
                      )}

                      {slideCheck && (
                        <CheckBlock
                          check={slideCheck}
                          lang={lang}
                          answer={slideAnswer}
                          onAnswer={(opt) => answerCheck(currentIndex, opt, slideCheck)}
                          isDisplayMode={isDisplayMode}
                          parseText={parseInlineText}
                        />
                      )}
                    </div>
                  )}

                  {/* Right Panel: Diagram OR Adaptive Example Block */}
                  {rightPanelExists && (
                    <div className={`flex-1 w-full ${hasContent ? 'lg:w-[55%]' : 'lg:w-full'} bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center flex-shrink-0 min-h-0 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-3 sm:p-4 lg:p-8'}`}>
                      
                      {hasDiagram ? (
                        <div className={`relative w-full h-full bg-white dark:bg-slate-800 shadow-sm flex flex-col items-center justify-center overflow-hidden group transition-all duration-300 
                          ${isDisplayMode ? 'rounded-[2rem]' : 'rounded-2xl lg:rounded-[2rem]'} 
                          ${currentSlide.drawThis ? 'border-[3px] lg:border-[4px] border-[#ffc800]' : 'border-2 border-slate-200 dark:border-slate-700'}`}>
                          
                          {currentSlide.drawThis && (
                            <div className={`absolute top-0 right-0 bg-[#ffc800] text-amber-950 font-black uppercase tracking-widest rounded-bl-2xl lg:rounded-bl-3xl z-20 shadow-sm flex items-center border-b-2 border-l-2 border-[#cca000] ${isDisplayMode ? 'text-[clamp(0.75rem,1vw,1.1rem)] px-5 py-2.5' : 'text-[9px] sm:text-xs px-3 lg:px-4 py-1.5 lg:py-2'}`}>
                              <Pencil className={`${isDisplayMode ? 'w-4 h-4 mr-2' : 'w-3 h-3 lg:w-4 lg:h-4 mr-1.5 lg:mr-2'}`} strokeWidth={3} />
                              {lang === 'vn' ? 'Vẽ Hình Này' : 'Draw This'}
                            </div>
                          )}

                          {currentSlide.widget ? (
                            <div className={`w-full h-full flex items-center justify-center ${isDisplayMode ? 'p-6' : 'p-2 sm:p-4'}`}>
                              <WidgetErrorBoundary>
                                <WidgetRenderer config={currentSlide.widget} />
                              </WidgetErrorBoundary>
                            </div>
                          ) : currentSlide.inlineSvg ? (
                            <div 
                              className={`w-full h-full flex items-center justify-center ${isDisplayMode ? 'p-6' : 'p-3 sm:p-4'}`}
                              dangerouslySetInnerHTML={{ __html: currentSlide.inlineSvg }} 
                            />
                          ) : (
                            <iframe 
                              src={currentSlide.image} 
                              title={slideTitle || "Educational Diagram"}
                              className="absolute inset-0 w-full h-full pointer-events-none select-none dark:opacity-90 object-contain"
                              scrolling="no"
                              frameBorder="0"
                            />
                          )}
                          
                          <button 
                            onClick={() => setZoomedImage(
                              currentSlide.widget 
                                ? { type: 'widget', config: currentSlide.widget }
                                : currentSlide.inlineSvg 
                                  ? { type: 'svg', content: currentSlide.inlineSvg } 
                                  : { type: 'url', src: currentSlide.image }
                            )}
                            className="absolute top-2 lg:top-4 right-2 lg:right-4 p-2.5 lg:p-3 bg-white/90 backdrop-blur hover:bg-slate-100 text-slate-600 hover:text-[#1cb0f6] rounded-xl shadow-sm border-2 border-slate-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-30 scale-95 hover:scale-100 active:scale-95 border-b-[4px] active:border-b-[2px] active:translate-y-[2px]"
                            title="Expand"
                          >
                            <Maximize2 className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
                          </button>
                        </div>
                      ) : showExampleOnRight ? (
                        
                        <div className={`w-full h-full bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl lg:rounded-[2rem] relative shadow-inner flex flex-col overflow-hidden`}>
                          <div className={`w-full ${themeColor} text-white font-black uppercase tracking-widest flex items-center shadow-md ${isDisplayMode ? 'text-[clamp(0.9rem,1.3vw,1.3rem)] px-8 py-5' : 'text-xs px-6 py-4'}`}>
                            <Target className="w-5 h-5 mr-3 opacity-80" />
                            {displayLabel}
                          </div>
                          <div className={`flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 font-bold text-slate-800 dark:text-slate-200 leading-relaxed ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-base lg:text-xl'}`}>
                            {renderContent(slideExample, true)}
                          </div>
                        </div>

                      ) : null}
                    </div>
                  )}
                </div>
              </>
            );
          })()}

          {currentSlide.type === 'summary' && (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white ${currentSlide.color || 'bg-[#58cc02]'} min-h-0 overflow-y-auto`}>
              <div className={`bg-white/20 mx-auto rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border-[4px] border-white/30 ${isDisplayMode ? 'w-32 h-32' : 'w-24 h-24'}`}>
                <CheckCircle2 className={`opacity-100 ${isDisplayMode ? 'w-16 h-16' : 'w-12 h-12'}`} strokeWidth={3} />
              </div>
              <h1 className={`font-black tracking-tight mb-6 drop-shadow-md leading-tight ${isDisplayMode ? 'text-[clamp(3rem,6vw,7rem)]' : 'text-4xl lg:text-6xl'}`}>{slideTitle || "Complete"}</h1>
              <p className={`font-bold opacity-90 drop-shadow-sm max-w-4xl mx-auto ${isDisplayMode ? 'text-[clamp(1.5rem,3vw,3rem)]' : 'text-xl lg:text-2xl'}`}>{slideSubtitle}</p>
              
              {/* FIX: Audio button universally applied to the summary screen */}
              {!isDisplayMode && currentSlide.audio && (
                 <button onClick={() => {
                      toggleAudio(currentSlide.audio);
                    }} className="mt-12 mx-auto flex items-center bg-white text-slate-800 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-md border-b-[4px] border-slate-200 active:border-b-0 active:translate-y-[4px] px-6 py-3 text-sm">
                   {isPlayingAudio ? <PauseCircle className="w-6 h-6 mr-3 text-slate-800" /> : <PlayCircle className="w-6 h-6 mr-3 text-slate-800" />}
                   {isPlayingAudio ? "Stop Audio" : "Listen"}
                 </button>
              )}
            </div>
          )}

          {currentSlide.type === 'warmup' && (() => {
            const themeColor = currentSlide.color || 'bg-[#ff9600]';
            return (
              <>
                {/* Amber "Do Now" header */}
                <div className={`${themeColor} ${isDisplayMode ? 'p-3 lg:p-4' : 'p-4 lg:p-6'} text-white flex items-center relative overflow-hidden flex-shrink-0 border-b-4 border-black/10`}>
                  <div className={`bg-white/20 rounded-xl mr-3 sm:mr-4 shadow-inner border border-white/30 ${isDisplayMode ? 'p-2' : 'p-2.5 lg:p-3'}`}>
                    <Pencil className={`drop-shadow-sm ${isDisplayMode ? 'w-6 h-6' : 'w-5 h-5 lg:w-8 lg:h-8'}`} strokeWidth={2.5} />
                  </div>
                  <h2 className={`font-black tracking-tight drop-shadow-md ${isDisplayMode ? 'text-[clamp(1.25rem,2vw,2rem)]' : 'text-xl sm:text-2xl lg:text-4xl'}`}>
                    {slideTitle || 'Do Now'}
                  </h2>
                  <div className={`ml-auto bg-white/20 text-white font-black uppercase tracking-[0.2em] rounded-full border border-white/30 shadow-inner ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[9px] sm:text-xs px-3 py-1.5'}`}>
                    {lang === 'vn' ? 'Viết vào vở' : 'Write it down'}
                  </div>
                </div>
                {/* Body */}
                <div className={`flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden`}>
                  <div className={`flex-1 overflow-y-auto custom-scrollbar ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-4 sm:p-6 lg:p-10'} ${currentSlide.inlineSvg ? 'lg:w-[55%] lg:border-r-2 border-slate-100 dark:border-slate-800' : 'w-full max-w-4xl mx-auto'}`}>
                    {renderContent(slideContent)}
                    {slideCheck && (
                      <CheckBlock
                        check={slideCheck}
                        lang={lang}
                        answer={slideAnswer}
                        onAnswer={(opt) => answerCheck(currentIndex, opt, slideCheck)}
                        isDisplayMode={isDisplayMode}
                        parseText={parseInlineText}
                      />
                    )}
                  </div>
                  {currentSlide.inlineSvg && (
                    <div className={`flex-1 lg:w-[45%] bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center flex-shrink-0 min-h-0 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-3 sm:p-4 lg:p-8'}`}>
                      <div
                        className="w-full h-full flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl lg:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-sm p-3 sm:p-4"
                        dangerouslySetInnerHTML={{ __html: currentSlide.inlineSvg }}
                      />
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Top-Right Floating Presenter Control Dock (Display Mode Only) */}
      {isDisplayMode && (
        <div className={`absolute top-2.5 sm:top-3 right-3 sm:right-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-white/15 z-50 transition-all duration-500 pointer-events-auto ${isIdle ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 transition-colors">
            <ChevronLeft className="w-5 h-5" strokeWidth={3} />
          </button>
          
          {bilingual && (
            <div className="flex items-center gap-1 px-1.5 border-r border-l border-white/20">
              <button onClick={() => setLang('en')} className={`px-2.5 py-1.5 rounded-lg font-black text-xs tracking-wider ${lang === 'en' ? 'bg-[#1cb0f6] text-white' : 'text-white/50 hover:text-white'}`}>EN</button>
              <button onClick={() => setLang('vn')} className={`px-2.5 py-1.5 rounded-lg font-black text-xs tracking-wider ${lang === 'vn' ? 'bg-[#1cb0f6] text-white' : 'text-white/50 hover:text-white'}`}>VN</button>
            </div>
          )}

          {currentSlide.audio && (
            <button 
              onClick={() => {
                      toggleAudio(currentSlide.audio);
                    }}
              className={`flex items-center justify-center p-2 rounded-xl font-black transition-colors ${isPlayingAudio ? 'bg-amber-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              title="Play Audio"
            >
              {isPlayingAudio ? <Volume2 className="w-5 h-5 animate-pulse" /> : <PlayCircle className="w-5 h-5" strokeWidth={2.5} />}
            </button>
          )}

          <button onClick={toggleDisplayMode} className="p-2 rounded-xl bg-white/10 text-slate-300 hover:bg-rose-500 hover:text-white transition-colors" title="Exit Presentation (Esc)">
             <Minimize2 className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <button onClick={handleNext} disabled={pendingCheck} className="p-2 rounded-xl bg-[#58cc02] text-white hover:bg-[#46a802] transition-colors shadow-sm ml-0.5 disabled:opacity-30 disabled:pointer-events-none">
            <ChevronRight className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      )}

      {/* Subtle 3D Progress Bar Bottom Anchored (Display Mode Only) */}
      {isDisplayMode && (
        <div className={`fixed bottom-0 left-0 right-0 h-1.5 bg-slate-200/20 dark:bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-500 pointer-events-none ${isIdle ? 'opacity-0' : 'opacity-100'}`}>
          <div 
            className="h-full bg-[#58cc02] transition-all duration-500 ease-out relative shadow-[0_-1px_10px_rgba(88,204,2,0.4)]"
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/40"></div>
          </div>
        </div>
      )}

      {/* Resume notice: says where the deck reopened, and offers the top. */}
      {!isDisplayMode && resumedAt !== null && (
        <div className="bg-[#1cb0f6]/10 dark:bg-[#1cb0f6]/15 border-t-2 border-[#1cb0f6]/30 px-4 py-2 z-20 flex-shrink-0 flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-[#1899d6] dark:text-[#5cc8ff] animate-in fade-in">
          <Repeat className="w-4 h-4 shrink-0" strokeWidth={3} />
          <span>
            {lang === 'vn'
              ? `Tiếp tục từ slide ${resumedAt + 1} / ${slides.length}`
              : `Picked up where you left off — slide ${resumedAt + 1} of ${slides.length}`}
          </span>
          <button
            onClick={restart}
            className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border-2 border-[#1cb0f6]/40 hover:border-[#1cb0f6] text-[#1899d6] dark:text-[#5cc8ff] font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors"
          >
            {lang === 'vn' ? 'Làm lại từ đầu' : 'Start over'}
          </button>
        </div>
      )}

      {/* Standard Bottom Navigation (Hidden in Display Mode) */}
      {!isDisplayMode && (
        <div className="bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 px-3 py-2 sm:px-5 sm:py-2.5 z-20 flex-shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-1 sm:px-2 gap-3 sm:gap-4">

            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border-2 border-b-[4px] border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-30 disabled:pointer-events-none bg-white dark:bg-slate-900"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={3} />
            </button>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* An English-only track (ADD_MATH, COORD_SCI) has no Vietnamese
                  to switch to; the toggle only offered a button that did nothing. */}
              {bilingual && (
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-1 flex-shrink-0">
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 sm:px-5 py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-[#1cb0f6] shadow-sm border-2 border-slate-200 dark:border-slate-600' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 border-2 border-transparent'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang('vn')}
                    className={`px-3 sm:px-5 py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${lang === 'vn' ? 'bg-white dark:bg-slate-700 text-[#1cb0f6] shadow-sm border-2 border-slate-200 dark:border-slate-600' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 border-2 border-transparent'}`}
                  >
                    VN
                  </button>
                </div>
              )}

              {/* Narration for a layout slide (the legacy slide types carry
                  their own button in their header or hero). */}
              {hasLayout && currentSlide.audio && (
                <button
                  onClick={() => toggleAudio(currentSlide.audio)}
                  className={`flex items-center justify-center px-3 sm:px-4 py-2 rounded-xl transition-all border-2 active:scale-95 ${isPlayingAudio
                    ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#1cb0f6]'}`}
                  title={isPlayingAudio ? 'Stop audio' : 'Listen to this slide'}
                >
                  {isPlayingAudio ? <Volume2 className="w-5 h-5 sm:mr-2 animate-pulse" strokeWidth={2.5} /> : <PlayCircle className="w-5 h-5 sm:mr-2" strokeWidth={2.5} />}
                  <span className="hidden sm:inline text-xs font-black uppercase tracking-widest">{isPlayingAudio ? 'Stop' : 'Listen'}</span>
                </button>
              )}

              <button
                onClick={toggleDisplayMode}
                className="hidden md:flex items-center justify-center px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-[#1cb0f6] transition-all border-2 border-slate-200 dark:border-slate-700 active:scale-95"
                title="Project to TV (Fullscreen)"
              >
                <MonitorPlay className="w-5 h-5 mr-2" strokeWidth={2.5} />
                <span className="text-xs font-black uppercase tracking-widest">Project</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              disabled={pendingCheck}
              title={pendingCheck ? 'Answer the check question first' : undefined}
              className={`flex items-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase transition-all border-b-[4px] active:border-b-0 active:translate-y-[4px] disabled:opacity-40 disabled:pointer-events-none
                ${currentIndex === slides.length - 1
                  ? 'bg-[#58cc02] border-[#58a700] text-white hover:bg-[#46a802]'
                  : 'bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]'}`}
            >
              <span className="hidden sm:inline">{currentIndex === slides.length - 1 ? 'Finish' : 'Continue'}</span>
              <span className="sm:hidden">{currentIndex === slides.length - 1 ? 'End' : 'Next'}</span>
              {currentIndex !== slides.length - 1 && <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-1 sm:ml-2 -mr-1 sm:-mr-2" strokeWidth={3} />}
            </button>

          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 pointer-events-auto cursor-auto">
          <button 
            onClick={() => setZoomedImage(null)} 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-xl transition-colors shadow-xl border-2 border-slate-200 active:scale-95 z-50 border-b-[4px] active:border-b-[2px] active:translate-y-[2px]"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
          </button>
          
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden p-2 sm:p-6 animate-in zoom-in-95 duration-300 border-4 border-slate-200 dark:border-slate-700">
             {zoomedImage.type === 'widget' ? (
               <WidgetErrorBoundary>
                 <WidgetRenderer config={zoomedImage.config} />
               </WidgetErrorBoundary>
             ) : zoomedImage.type === 'svg' ? (
               <div 
                 className="w-full h-full flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl shadow-sm"
                 dangerouslySetInnerHTML={{ __html: zoomedImage.content }} 
               />
             ) : (
               <iframe 
                 src={zoomedImage.src} 
                 title="Expanded Diagram"
                 className="w-full h-full pointer-events-none select-none dark:opacity-90 rounded-xl bg-white dark:bg-slate-800 shadow-sm"
                 scrolling="no"
                 frameBorder="0"
               />
             )}
          </div>
        </div>
      )}
    </div>
  );
}