import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Volume2, PenTool, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function VocabWriting({ pool, track, onComplete, onQuit }) {
  const { realWords = [], passages = [] } = pool || {};
  const audioState = useRef({ currentAudio: null });
  const [btnCooldown, setBtnCooldown] = useState(false);

  // Start page at the top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
    
    return () => {
      if (audioState.current.currentAudio) {
        audioState.current.currentAudio.pause();
      }
    };
  }, []);

  const playAudio = (type, word) => {
    if (btnCooldown) return;
    
    setBtnCooldown(true);
    setTimeout(() => setBtnCooldown(false), 400);

    if (audioState.current.currentAudio) {
      audioState.current.currentAudio.pause();
      audioState.current.currentAudio.currentTime = 0;
    }

    const basePath = import.meta.env.BASE_URL || '/';
    const audio = new Audio(`${basePath}audio/${track}/${type}_${word.toLowerCase()}.mp3`);
    
    audioState.current.currentAudio = audio;
    audio.play().catch(err => console.warn(`Could not play ${type} audio for ${word}`, err));
  };

  const renderPassageWithHighlights = (text) => {
    if (!text) return null;
    const parts = text.split(/(\{.*?\})/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const word = part.slice(1, -1);
        return (
          <strong key={i} className="text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/40 px-1.5 py-0.5 rounded-md mx-0.5 shadow-sm border border-indigo-200 dark:border-indigo-800">
            {word}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans pb-32">
      <TopBar current={0} total={1} onQuit={onQuit} modeTitle="Vocab Writing" />

      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 w-full max-w-5xl mx-auto mt-2 sm:mt-6">
        
        <div className="w-full bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[2rem] p-8 sm:p-10 shadow-lg text-white mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
            <FileText className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center bg-white/20 px-4 py-2 rounded-2xl mb-4 font-bold tracking-widest uppercase text-sm backdrop-blur-sm border border-white/20">
              <FileText className="w-5 h-5 mr-2" /> Phase 2
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-3">Vocab Writing</h1>
            <p className="text-lg text-indigo-50 font-medium max-w-3xl">
              Write each vocabulary word and its definition carefully into your physical notebook. Review the sentences and passages below to see how these words are used in real scientific context.
            </p>
          </div>
        </div>

        <div className="w-full space-y-6">
          {realWords.map((wordObj, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-all hover:shadow-md">

              <div className="bg-slate-50/50 dark:bg-slate-800/40 p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-black text-slate-800 dark:text-white capitalize flex items-center flex-wrap gap-3">
                    {wordObj.word}
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1 rounded-xl border border-indigo-100 dark:border-indigo-800">
                      {wordObj.vn}
                    </span>
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => playAudio('word', wordObj.word)} className="flex items-center bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm">
                    <Volume2 className="w-4 h-4 mr-2" /> Word
                  </button>
                  <button onClick={() => playAudio('def', wordObj.word)} className="flex items-center bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm">
                    <Volume2 className="w-4 h-4 mr-2" /> Def
                  </button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="space-y-4">
                  <div>
                    <span className="font-black text-[11px] text-slate-400 uppercase tracking-widest mb-1.5 block">English Definition</span>
                    <p className="font-bold text-lg text-slate-800 dark:text-slate-100 leading-snug">{wordObj.def}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-black text-[11px] text-slate-400 uppercase tracking-widest mb-1.5 block">Vietnamese Meaning</span>
                    <p className="font-medium text-slate-600 dark:text-slate-400 italic leading-snug">{wordObj.vnDef}</p>
                  </div>
                </div>

                <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-8 flex flex-col justify-center">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-black text-[11px] text-slate-400 uppercase tracking-widest">Sample Sentence</span>
                      <button onClick={() => playAudio('sentence', wordObj.word)} className="text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors p-1 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg"><Volume2 className="w-4 h-4" /></button>
                    </div>
                    <p className="font-bold text-base text-slate-800 dark:text-slate-100 leading-snug">"{wordObj.sent}"</p>
                    <p className="font-medium text-sm text-slate-500 dark:text-slate-400 italic mt-1">"{wordObj.vnSent}"</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="w-full mt-16">
          <div className="flex items-center mb-8">
            <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h2 className="text-3xl font-black text-slate-800 dark:text-white">Reading Passages in Context</h2>
          </div>

          <div className="space-y-6">
            {passages.map((p, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">{p.title}</h3>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-loose">
                  {renderPassageWithHighlights(p.text)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-[2rem] p-8 sm:p-10 text-center mt-16 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>

          <div className="bg-amber-100 dark:bg-amber-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-200 dark:border-amber-800">
             <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-3xl font-black text-amber-900 dark:text-amber-200 mb-3 tracking-tight">Teacher Review Required</h3>
          <p className="text-lg text-amber-800 dark:text-amber-300 font-medium max-w-2xl mx-auto">
            To earn points for this section, you must show Mr. Bowen your <strong className="font-black">vocabulary definitions</strong> written down, PLUS the <strong className="font-black">answers to the Short Answers</strong> from the next section written in your physical notebook.
          </p>
          
          <button 
            onClick={() => onComplete(0)} 
            className="mt-8 px-10 py-5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xl uppercase tracking-widest rounded-2xl shadow-md border-b-[5px] border-amber-700 active:border-b-0 active:translate-y-[5px] transition-all"
          >
            <span className="flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 mr-2" /> I Understand
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}