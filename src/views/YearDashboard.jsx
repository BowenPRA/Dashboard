import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, XCircle, Loader2, LogOut, AlertTriangle, Construction } from 'lucide-react';

import { useStudentProgress } from '../hooks/useStudentProgress';
import UnitCard from '../components/UnitCard';

import { Y8_META, Y8_DATA, Y9_META, Y9_DATA, ESL_META, ESL_DATA, GED_META, GED_DATA } from '../data/index';

const Recognition = lazy(() => import('../tasks/Recognition'));
const Spell = lazy(() => import('../tasks/Spell'));
const Dictation = lazy(() => import('../tasks/Dictation'));
const Reading = lazy(() => import('../tasks/Reading'));
const ShortAnswers = lazy(() => import('../tasks/ShortAnswers'));
const Diagrams = lazy(() => import('../tasks/Diagrams'));
const Essay = lazy(() => import('../tasks/Essay'));
const Assessment = lazy(() => import('../tasks/Assessment'));
const Notes = lazy(() => import('../tasks/Notes'));
const Games = lazy(() => import('../tasks/Games'));

const THEMES = {
  Y8: { bg: 'bg-indigo-50', banner: 'from-indigo-500 via-indigo-600 to-blue-700', iconBg: 'bg-indigo-100', iconText: 'text-indigo-700', accent: 'border-indigo-400' },
  Y9: { bg: 'bg-emerald-50', banner: 'from-emerald-500 via-emerald-600 to-teal-700', iconBg: 'bg-emerald-100', iconText: 'text-emerald-700', accent: 'border-emerald-400' },
  ESL: { bg: 'bg-amber-50', banner: 'from-amber-500 via-amber-600 to-orange-700', iconBg: 'bg-amber-100', iconText: 'text-amber-700', accent: 'border-amber-400' },
  GED: { bg: 'bg-rose-50', banner: 'from-rose-500 via-rose-600 to-red-700', iconBg: 'bg-rose-100', iconText: 'text-rose-700', accent: 'border-rose-400' }
};

function PlaceholderView({ title, onQuit }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Construction className="w-12 h-12 text-amber-500" />
      </div>
      <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">{title}</h2>
      <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-200 mb-10 text-lg font-bold text-slate-500">
        Under Construction / Coming Soon
      </div>
      <button onClick={onQuit} className="px-10 py-5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl uppercase tracking-widest border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all">
        Return to Dashboard
      </button>
    </div>
  );
}

export default function YearDashboard({ track }) {
  const navigate = useNavigate();
  
  const { user, unitScores = {}, isLoadingDB, saveScore, addStrike, handleLogout } = useStudentProgress(navigate, track);

  const [appState, setAppState] = useState('MENU');
  const [activeUnit, setActiveUnit] = useState(null);
  const [currentPool, setCurrentPool] = useState([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  if (isLoadingDB) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
        <p className="text-slate-500 font-bold tracking-widest uppercase animate-pulse">Syncing with Cloud...</p>
      </div>
    );
  }

  let META_DATA = [];
  let UNIT_DATA = {};
  let trackTitle = "";
  const currentTheme = THEMES[track] || THEMES.Y8;

  if (track === 'Y8') { META_DATA = Y8_META || []; UNIT_DATA = Y8_DATA || {}; trackTitle = "Year 8 Science"; }
  else if (track === 'Y9') { META_DATA = Y9_META || []; UNIT_DATA = Y9_DATA || {}; trackTitle = "Year 9 Science"; }
  else if (track === 'ESL') { META_DATA = ESL_META || []; UNIT_DATA = ESL_DATA || {}; trackTitle = "ESL Foundation"; }
  else if (track === 'GED') { META_DATA = GED_META || []; UNIT_DATA = GED_DATA || {}; trackTitle = "English"; }

  let totalTrackXP = 0;
  let maxTrackXP = META_DATA.length * 100;
  
  META_DATA.forEach(unit => {
    const s = unitScores?.[unit.id] || {};
    const unitTotal = Object.entries(s)
      .filter(([key]) => key !== 'strikes')
      .reduce((sum, [key, val]) => {
        let max = 10;
        if (['p1', 'p10', 'p11'].includes(key)) max = 5;
        if (['p6', 'p7', 'p8'].includes(key)) max = 20;
        return sum + Math.min(val?.current || 0, max);
      }, 0);
    totalTrackXP += unitTotal;
  });

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';

  const startMode = (unitId, mode) => {
    setActiveUnit(unitId);
    const data = UNIT_DATA[unitId];
    if (!data) return;

    // Single source of truth for constructing absolute paths natively mapped off BASE_URL
    const basePath = import.meta.env.BASE_URL === '/' ? '' : (import.meta.env.BASE_URL || '').replace(/\/$/, '');

    const realW = (data.realWords || []).map(w => ({ 
      ...w, 
      isReal: true,
      audio: `${basePath}/audio/${track}/${unitId}/word_${w.word.toLowerCase()}.mp3`,
      defAudio: `${basePath}/audio/${track}/${unitId}/def_${w.word.toLowerCase()}.mp3`,
      sentAudio: `${basePath}/audio/${track}/${unitId}/sentence_${w.word.toLowerCase()}.mp3`
    }));

    if (mode === 'WORD_REC' || mode === 'SPELLING') {
      setCurrentPool([...realW].sort(() => Math.random() - 0.5));
    } else if (mode === 'DICTATION') {
      const dictationData = data.dictation || [];
      const dictationPool = realW.map((w, i) => ({
        ...w,
        dictSent: dictationData[i]?.sent || w.sent,
        dictVn: dictationData[i]?.vnSent || w.vnSent
      })).sort(() => Math.random() - 0.5);
      setCurrentPool(dictationPool);
    } else if (mode === 'GAMES') {
      const gamePool = [...realW].sort(() => Math.random() - 0.5);
      gamePool.gameConfig = data.games?.gameConfig || null;
      setCurrentPool(gamePool);
    } else if (mode === 'READ_COMP') {
      setCurrentPool(data.passages || []);
    } else if (mode === 'SHORT_ANSWERS') {
      setCurrentPool({ shortQA: data.shortQA || [] });
    } else if (mode === 'DIAGRAMS') {
      setCurrentPool({ diagrams: data.diagrams || [] });
    } else if (mode === 'ESSAY') {
      setCurrentPool({ essay: data.essay || null });
    } else if (mode === 'ASSESSMENT') {
      setCurrentPool([]);
    } else if (mode === 'NOTES') {
      // Clean injection of absolute paths ensures Notes.jsx doesn't have to guess or append
      const fixedNotes = (data.notes || []).map(note => {
        const newNote = { ...note };
        if (note.audio) {
          const cleanAudio = note.audio.replace(/^\//, '');
          newNote.audio = `${basePath}/${cleanAudio}`;
        }
        if (note.image) {
          const cleanImage = note.image.replace(/^\//, '');
          newNote.image = `${basePath}/${cleanImage}`;
        }
        return newNote;
      });
      setCurrentPool(fixedNotes);
    }
    
    setAppState(mode);
  };

  const handleTaskComplete = async (section, rawScore, answers = null) => {
    let finalScore = rawScore;

    if (['p1', 'p10', 'p11'].includes(section)) {
      if (section === 'p10' || section === 'p11') finalScore = 5; 
      else finalScore = Math.min(5, Math.ceil((rawScore / 10) * 5)); 
    } else if (['p6', 'p7', 'p8'].includes(section)) {
      finalScore = rawScore <= 10 ? Math.ceil((rawScore / 10) * 20) : rawScore; 
      finalScore = Math.min(20, finalScore);
    } else {
      finalScore = Math.min(10, finalScore);
    }

    await saveScore(activeUnit, section, finalScore, answers);
    setAppState('MENU');
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} selection:bg-indigo-200 selection:text-indigo-900 transition-colors duration-500`}>
      {appState === 'MENU' && (
        <div className="animate-in fade-in duration-500 pb-20">
          
          <div className={`relative w-full bg-gradient-to-r ${currentTheme.banner} shadow-xl overflow-hidden`}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[35rem] h-[35rem] bg-white opacity-20 rounded-full blur-[90px] mix-blend-overlay"></div>
              <div className="absolute -bottom-24 -left-24 w-[25rem] h-[25rem] bg-black opacity-20 rounded-full blur-[70px] mix-blend-multiply"></div>
              <div className="absolute top-10 left-1/3 w-64 h-64 bg-white opacity-10 rounded-full blur-[60px] animate-pulse"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.2] mix-blend-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                
                <div className="flex items-center space-x-6">
                  <button onClick={() => navigate('/home')} className="bg-white/10 p-4 rounded-2xl hover:bg-white/25 transition-all text-white backdrop-blur-md active:scale-95 shadow-sm border border-white/20">
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3 drop-shadow-md">{trackTitle}</h1>
                    <div className="inline-flex bg-gradient-to-b from-amber-400 to-amber-500 text-amber-900 px-5 py-2.5 rounded-2xl shadow-lg border-b-[4px] border-amber-600 items-center space-x-3 backdrop-blur-md">
                      <span className="text-2xl drop-shadow-sm">🏆</span>
                      <span className="text-[13px] font-black uppercase tracking-widest opacity-90 mt-0.5">Total XP</span>
                      <span className="text-lg font-black bg-white/40 px-3 py-0.5 rounded-xl shadow-inner border border-white/30">{totalTrackXP} / {maxTrackXP}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-white">
                  <button onClick={() => setShowHowItWorks(true)} className="flex items-center bg-white/10 px-5 py-3.5 rounded-2xl text-sm font-bold hover:bg-white/25 transition-all shadow-sm backdrop-blur-md border border-white/20 active:scale-95">
                    <Info className="w-5 h-5 mr-2 opacity-90" /> How it Works
                  </button>
                  <div className="flex items-center bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm pl-5 pr-3 group transition-all hover:bg-white/15">
                    <span className="font-black text-sm uppercase tracking-widest text-white mr-4 drop-shadow-sm">{userName}</span>
                    <button onClick={handleLogout} className="bg-white/20 hover:bg-rose-500 text-white p-2.5 rounded-xl transition-all shadow-sm active:scale-95" title="Logout">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-10">
            {META_DATA.map((metaUnit) => {
              const contentData = UNIT_DATA[metaUnit.id] || {};
              const combinedUnitPayload = {
                ...contentData,
                id: metaUnit.id,
                meta: {
                  id: metaUnit.id,
                  title: metaUnit.title,
                  description: metaUnit.desc,
                  icon: contentData.meta?.icon || 'BookOpen',
                  thresholds: contentData.meta?.thresholds
                }
              };

              return (
                <UnitCard 
                  key={metaUnit.id} 
                  unit={combinedUnitPayload} 
                  scores={unitScores?.[metaUnit.id] || {}} 
                  currentTheme={currentTheme} 
                  startMode={startMode} 
                />
              );
            })}
          </div>
        </div>
      )}

      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full p-8 md:p-10 relative max-h-[90vh] overflow-y-auto">
             <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-3xl font-black text-slate-800 flex items-center tracking-tight"><div className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-4 shadow-inner"><Info className="w-7 h-7"/></div>How it Works</h2>
                <button onClick={() => setShowHowItWorks(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><XCircle className="w-8 h-8"/></button>
             </div>
             
             <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
               Welcome to the <strong className="text-slate-800">Science Lab</strong>! This platform uses <strong className="text-indigo-600">CLIL</strong> (Content and Language Integrated Learning) to help you master English through real scientific concepts. Here is how your learning journey works:
             </p>
             
             <div className="space-y-4 mb-8">
               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start shadow-sm hover:shadow-md transition-all">
                 <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1 shadow-inner"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div></div>
                 <div>
                   <h3 className="font-bold text-slate-800 text-xl mb-1">Phase 1: Core Practice</h3>
                   <p className="text-slate-500 font-medium leading-relaxed">Fast-paced language drills inspired by the <strong>DET</strong> (Duolingo English Test) and <strong>PTE</strong> formats. Build your spelling, listening, and reading skills.</p>
                 </div>
               </div>
               
               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start shadow-sm hover:shadow-md transition-all">
                 <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1 shadow-inner"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div></div>
                 <div>
                   <h3 className="font-bold text-slate-800 text-xl mb-1">Phase 2: AI Graded Writing</h3>
                   <p className="text-slate-500 font-medium leading-relaxed">Practice short answers and essays. Our AI Tutor grades your work instantly using the official <strong>Cambridge Mark Scheme</strong> to give you personalized feedback.</p>
                 </div>
               </div>
             </div>

             <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl mb-8 flex items-start shadow-sm">
               <AlertTriangle className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-black text-rose-800 text-sm uppercase tracking-widest mb-1 opacity-90">AI Monitoring & Safety</h4>
                 <p className="text-rose-700 text-sm font-medium leading-relaxed">
                   Student submissions to the AI grader are monitored. Any harmful, inappropriate, or "joke" answers are flagged. <strong>After 3 strikes</strong>, you will be permanently locked out of the AI Tutor for that unit and can only earn partial points.
                 </p>
               </div>
             </div>
             
             <div className="flex justify-end">
               <button onClick={() => setShowHowItWorks(false)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg uppercase tracking-widest px-10 py-4 rounded-2xl border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-md">
                 Understood
               </button>
             </div>
          </div>
        </div>
      )}

      {appState === 'WORKBOOK' && <PlaceholderView title="Extra Workbook Practice" onQuit={() => setAppState('MENU')} />}

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-12 h-12 animate-spin text-indigo-500" /></div>}>
        {appState === 'WORD_REC' && <Recognition pool={currentPool} track={track} unitId={activeUnit} onComplete={(s) => handleTaskComplete('p1', s)} />}
        {appState === 'SPELLING' && <Spell pool={currentPool} track={track} unitId={activeUnit} onComplete={(s) => handleTaskComplete('p2', s)} onQuit={() => setAppState('MENU')} />}
        {appState === 'DICTATION' && <Dictation pool={currentPool} track={track} unitId={activeUnit} onComplete={(s) => handleTaskComplete('p3', s)} onQuit={() => setAppState('MENU')} />}
        {appState === 'READ_COMP' && <Reading pool={currentPool} track={track} unitId={activeUnit} onComplete={(s) => handleTaskComplete('p4', s)} onQuit={() => setAppState('MENU')} />}
        
        {appState === 'NOTES' && <Notes slides={currentPool} onComplete={() => handleTaskComplete('p10', 10)} onQuit={() => setAppState('MENU')} />}

        {appState === 'SHORT_ANSWERS' && (
          <ShortAnswers 
            pool={currentPool} 
            savedData={unitScores[activeUnit]?.p6?.answers || {}} 
            strikes={unitScores[activeUnit]?.strikes || 0}
            onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)}
            onComplete={(s, answers) => handleTaskComplete('p6', s, answers)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}
        
        {appState === 'DIAGRAMS' && (
          <Diagrams 
            pool={currentPool} 
            unitId={activeUnit}
            savedData={unitScores[activeUnit]?.p7?.answers || {}} 
            strikes={unitScores[activeUnit]?.strikes || 0}
            onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)}
            onComplete={(s, answers) => handleTaskComplete('p7', s, answers)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}

        {appState === 'ESSAY' && (
          <Essay 
            pool={currentPool} 
            savedData={unitScores[activeUnit]?.p8?.answers || {}} 
            strikes={unitScores[activeUnit]?.strikes || 0}
            onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)}
            onComplete={(s, answers) => handleTaskComplete('p8', s, answers)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}

        {appState === 'ASSESSMENT' && (
          <Assessment 
            unit={UNIT_DATA[activeUnit]} 
            onComplete={(score) => handleTaskComplete('p9', score)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}
        {appState === 'GAMES' && (
          <Games 
            pool={currentPool} 
            unitId={activeUnit}
            scores={unitScores[activeUnit] || {}} 
            onComplete={(score) => handleTaskComplete('p12', score)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}
      </Suspense>

    </div>
  );
}