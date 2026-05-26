import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, BookOpen, Scale, Target, 
  MessageSquare, ShieldCheck, CheckCircle2, Construction, 
  PlayCircle, PauseCircle, Maximize2, X, Pencil
} from 'lucide-react';
import TopBar from '../components/TopBar';

const IconMap = { BookOpen, Scale, Target, MessageSquare, ShieldCheck };

export default function Notes({ slides, onComplete, onQuit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [lang, setLang] = useState('en');
  
  const audioRef = useRef(null);
  const activeAudioUrl = useRef(null); 

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

  useEffect(() => {
    stopAudio();
  }, [currentIndex]);

  const handleQuit = () => {
    stopAudio();
    if (typeof onQuit === 'function') onQuit();
  };

  const handleComplete = () => {
    stopAudio();
    if (typeof onComplete === 'function') onComplete();
  };

  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return (
      <div className="h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <Construction className="w-8 h-8 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Notes Unavailable</h2>
        <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-200 mb-6 text-sm font-bold text-slate-500">
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
  const slideContent = lang === 'vn' ? (currentSlide.contentVn || currentSlide.content) : currentSlide.content;
  const slideExample = lang === 'vn' ? (currentSlide.exampleVn || currentSlide.example) : currentSlide.example;

  const toggleAudio = (audioUrl) => {
    if (!audioUrl) return;

    try {
      if (isPlayingAudio && audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        if (!audioRef.current || activeAudioUrl.current !== audioUrl) {
          if (audioRef.current) audioRef.current.pause();
          audioRef.current = new Audio(audioUrl);
          activeAudioUrl.current = audioUrl;
          audioRef.current.onended = () => setIsPlayingAudio(false);
        }
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlayingAudio(true)).catch(error => {
            console.warn("Audio playback prevented by browser:", error);
            setIsPlayingAudio(false);
          });
        }
      }
    } catch (e) {
      console.warn("Audio interaction failed:", e);
      setIsPlayingAudio(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const parseBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={j}>{part}</span>;
    });
  };

  const renderContent = (text) => {
    if (!text || typeof text !== 'string') return null;
    const lines = text.split('\n');
    const elements = [];
    let groupedBumpers = [];

    const flushBumpers = () => {
      if (groupedBumpers.length > 0) {
        elements.push(
          <div key={`bumper-${elements.length}`} className="my-4 bg-amber-50/60 border-l-[4px] border-amber-400 p-4 rounded-r-xl relative animate-in fade-in transition-all">
            <div className="absolute -left-[14px] top-4 bg-amber-400 text-amber-900 p-1.5 rounded-full shadow-sm border-[2px] border-white z-10">
              <Pencil className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
            <div className="space-y-2 ml-3">
              {groupedBumpers.map((line, idx) => (
                <p key={idx} className="text-amber-900 font-medium text-base lg:text-lg leading-relaxed">
                  {parseBold(line)}
                </p>
              ))}
            </div>
          </div>
        );
        groupedBumpers = [];
      }
    };

    lines.forEach((line, i) => {
      if (!line.trim()) {
        flushBumpers();
        elements.push(<div key={`space-${i}`} className="h-2" />);
      } else if (line.trim().startsWith('>')) {
        groupedBumpers.push(line.replace('>', '').trim());
      } else {
        flushBumpers();
        elements.push(
          <p key={`p-${i}`} className="mb-3 text-slate-700 text-base lg:text-lg leading-relaxed font-medium">
            {parseBold(line)}
          </p>
        );
      }
    });
    flushBumpers(); 
    return elements;
  };

  const hasDiagram = !!currentSlide.image || !!currentSlide.inlineSvg;

  return (
    <div className="h-screen flex flex-col bg-slate-100 font-sans selection:bg-indigo-100 overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200 opacity-40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200 opacity-40 blur-[120px] pointer-events-none" />

      <TopBar 
        onQuit={handleQuit} 
        current={currentIndex + 1} 
        total={slides.length} 
        modeTitle="Lesson Notes Module" 
      />

      <div className="flex-1 flex justify-center items-center p-4 sm:p-6 lg:p-8 z-10 overflow-hidden relative">
        <div className={`w-full max-h-full flex flex-col bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden transition-all duration-500 ${hasDiagram ? 'max-w-7xl' : 'max-w-4xl'}`}>
          
          {currentSlide.type === 'intro' && (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white ${currentSlide.color || 'bg-[#1cb0f6]'} animate-in zoom-in-95 duration-500 overflow-y-auto`}>
              <div className="bg-white/20 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 backdrop-blur-sm shadow-inner border border-white/30">
                <BookOpen className="w-12 h-12 opacity-100" strokeWidth={2.5} />
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4 drop-shadow-md leading-tight">{slideTitle || 'Introduction'}</h1>
              <p className="text-xl lg:text-2xl font-bold opacity-90 drop-shadow-sm max-w-2xl mx-auto">{slideSubtitle}</p>
              
              {currentSlide.audio && (
                 <button onClick={() => toggleAudio(currentSlide.audio)} className="mt-8 mx-auto flex items-center bg-white text-slate-800 px-6 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-md">
                   {isPlayingAudio ? <PauseCircle className="w-5 h-5 mr-2 text-slate-800" /> : <PlayCircle className="w-5 h-5 mr-2 text-slate-800" />}
                   {isPlayingAudio ? "Stop Audio" : "Listen"}
                 </button>
              )}
            </div>
          )}

          {currentSlide.type === 'concept' && (() => {
            const SlideIcon = IconMap[currentSlide.icon] || BookOpen;
            const themeColor = currentSlide.color || 'bg-indigo-500';

            return (
              <>
                <div className={`${themeColor} p-5 lg:p-6 text-white flex items-center relative overflow-hidden flex-shrink-0`}>
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                  <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm shadow-inner border border-white/30 z-10">
                    <SlideIcon className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-black tracking-tight z-10 relative drop-shadow-md">{slideTitle || 'Concept'}</h2>
                  
                  {currentSlide.audio && (
                    <button 
                      onClick={() => toggleAudio(currentSlide.audio)} 
                      className="ml-auto z-10 bg-white/20 hover:bg-white/30 transition-colors p-2.5 rounded-full backdrop-blur-md shadow-md border border-white/30 active:scale-95"
                    >
                      {isPlayingAudio ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto min-h-0">
                  <div className={`p-6 lg:p-10 flex-1 flex flex-col justify-center ${hasDiagram ? 'lg:border-r border-slate-100 lg:w-[45%]' : ''}`}>
                    <div>{renderContent(slideContent)}</div>
                    
                    {slideExample && (
                      <div className={`${themeColor.replace('bg-', 'bg-').replace('500', '50').replace('400', '50')} bg-opacity-50 border-2 ${themeColor.replace('bg-', 'border-').replace('500', '200').replace('400', '200')} rounded-2xl p-5 relative mt-8 shadow-sm`}>
                        <div className={`absolute -top-3 left-6 ${themeColor} text-white text-[10px] lg:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-sm border border-white/20`}>
                          {lang === 'vn' ? 'Ví Dụ' : 'Example'}
                        </div>
                        <div className="text-base lg:text-xl font-bold text-slate-800 whitespace-pre-wrap mt-2 leading-relaxed">
                          {slideExample}
                        </div>
                      </div>
                    )}
                  </div>

                  {hasDiagram && (
                    <div className="w-full lg:w-[55%] bg-slate-50/40 p-4 lg:p-8 flex flex-col items-center justify-center flex-shrink-0">
                      <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden group">
                        
                        {currentSlide.inlineSvg ? (
                          <div 
                            className="w-full h-full flex items-center justify-center p-4"
                            dangerouslySetInnerHTML={{ __html: currentSlide.inlineSvg }} 
                          />
                        ) : (
                          <iframe 
                            src={currentSlide.image} 
                            title={slideTitle || "Educational Diagram"}
                            className="absolute inset-0 w-full h-full pointer-events-none select-none"
                            scrolling="no"
                            frameBorder="0"
                          />
                        )}
                        
                        <button 
                          onClick={() => setZoomedImage(
                            currentSlide.inlineSvg 
                              ? { type: 'svg', content: currentSlide.inlineSvg } 
                              : { type: 'url', src: currentSlide.image }
                          )}
                          className="absolute top-4 right-4 p-3 bg-white/95 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-xl shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 transition-all z-10 scale-95 hover:scale-100 active:scale-95"
                          title="Expand Image"
                        >
                          <Maximize2 className="w-6 h-6" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })()}

          {currentSlide.type === 'summary' && (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white ${currentSlide.color || 'bg-[#14b8a6]'} animate-in zoom-in-95 duration-500 overflow-y-auto`}>
              <div className="bg-white/20 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 backdrop-blur-sm shadow-inner border border-white/30">
                <CheckCircle2 className="w-12 h-12 opacity-100" strokeWidth={3} />
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4 drop-shadow-md leading-tight">{slideTitle || "Complete"}</h1>
              <p className="text-xl lg:text-2xl font-bold opacity-90 drop-shadow-sm max-w-2xl mx-auto">{slideSubtitle}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border-t border-slate-200 p-3 sm:p-4 z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] flex-shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-2 gap-4">
          
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl border-[2px] border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none shadow-sm bg-white"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
          </button>
          
          <div className="flex bg-slate-100 rounded-full shadow-inner border border-slate-200/60 p-1.5 flex-shrink-0 mx-auto">
            <button 
               onClick={() => setLang('en')} 
               className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
            >
              EN
            </button>
            <button 
               onClick={() => setLang('vn')} 
               className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${lang === 'vn' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
            >
              VN
            </button>
          </div>

          <button 
            onClick={handleNext}
            className={`flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg tracking-widest uppercase transition-all active:translate-y-[4px] border-b-[4px] active:border-b-0 shadow-md
              ${currentIndex === slides.length - 1 
                ? 'bg-[#58cc02] border-[#58a700] text-white hover:bg-[#46a802]' 
                : 'bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]'}`}
          >
            <span className="hidden sm:inline">{currentIndex === slides.length - 1 ? 'Finish' : 'Continue'}</span>
            <span className="sm:hidden">{currentIndex === slides.length - 1 ? 'End' : 'Next'}</span>
            {currentIndex !== slides.length - 1 && <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 -mr-1" strokeWidth={3} />}
          </button>

        </div>
      </div>

      {zoomedImage && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <button 
            onClick={() => setZoomedImage(null)} 
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-rose-500 text-white rounded-full transition-colors shadow-xl border border-white/20 active:scale-95 z-50"
          >
            <X className="w-8 h-8" strokeWidth={2.5} />
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center bg-white rounded-[2rem] shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-300">
             {zoomedImage.type === 'svg' ? (
               <div 
                 className="w-full h-full flex items-center justify-center"
                 dangerouslySetInnerHTML={{ __html: zoomedImage.content }} 
               />
             ) : (
               <iframe 
                 src={zoomedImage.src} 
                 title="Expanded Diagram"
                 className="w-full h-full pointer-events-none select-none"
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