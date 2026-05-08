import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, Search, Keyboard, Headphones, FileText, PenTool, Image as ImageIcon, Mic } from 'lucide-react';

// Import all data sources (Ensure index.js has these exported correctly)
import { Y8_META, Y8_DATA, Y9_META, Y9_DATA, ESL_META, ESL_DATA, GED_META, GED_DATA } from '../data/units/index';

// Component Imports
import WordRecognition from '../components/WordRecognition';
import ContextualSpelling from '../components/ContextualSpelling';
import ReadAndComplete from '../components/ReadAndComplete';
import Dictation from '../components/Dictation';
import DigitalNotes from '../components/DigitalNotes';
import ShortQA from '../components/ShortQA';
import GuidedEssay from '../components/GuidedEssay';
import DiagramAnalysis from '../components/DiagramAnalysis';
import SpeakingTask from '../components/SpeakingTask';

export default function YearDashboard({ track }) {
  const navigate = useNavigate();
  const [appState, setAppState] = useState('MENU');
  const [activeUnit, setActiveUnit] = useState(null);
  const [currentPool, setCurrentPool] = useState([]);
  
  const [unitScores, setUnitScores] = useState(() => JSON.parse(localStorage.getItem('scienceScoresV1')) || {});

  useEffect(() => {
    localStorage.setItem('scienceScoresV1', JSON.stringify(unitScores));
  }, [unitScores]);

  // Determine which data to load based on the track prop
  let META_DATA = [];
  let UNIT_DATA = {};
  let trackTitle = "";

  if (track === 'Y8') { META_DATA = Y8_META; UNIT_DATA = Y8_DATA; trackTitle = "Year 8 Science"; }
  else if (track === 'Y9') { META_DATA = Y9_META; UNIT_DATA = Y9_DATA; trackTitle = "Year 9 Science"; }
  else if (track === 'ESL') { META_DATA = ESL_META; UNIT_DATA = ESL_DATA; trackTitle = "ESL Foundation"; }
  else if (track === 'GED') { META_DATA = GED_META; UNIT_DATA = GED_DATA; trackTitle = "GED Prep"; }

  const startMode = (unitId, mode) => {
    setActiveUnit(unitId);
    const data = UNIT_DATA[unitId];
    if (!data) return;

    const realW = (data.realWords || []).map(w => ({ ...w, isReal: true }));
    const fakeW = (data.fakeWords || []).map(w => ({ ...w, isReal: false }));

    if (mode === 'WORD_REC') setCurrentPool([...realW, ...fakeW].sort(() => Math.random() - 0.5));
    else if (mode === 'SPELLING') setCurrentPool([...realW].sort(() => Math.random() - 0.5));
    else if (mode === 'DICTATION') setCurrentPool([...(data.dictation || [])].sort(() => Math.random() - 0.5));
    else if (mode === 'READ_COMP') setCurrentPool(data.passages || []);
    else if (mode === 'NOTES') setCurrentPool([...realW].sort((a, b) => a.word.localeCompare(b.word)));
    else if (mode === 'SHORT_QA') setCurrentPool(data.shortQA || []);
    else if (mode === 'ESSAY') setCurrentPool([data.essay].filter(Boolean));
    else if (mode === 'DIAGRAM') setCurrentPool([]);
    else if (mode === 'SPEAKING') setCurrentPool([]);
    
    setAppState(mode);
  };

  const saveScore = (section, score) => {
    setUnitScores(prev => {
      const unitData = prev[activeUnit] || {};
      const sectionData = unitData[section] || {};
      const isFirstTry = sectionData.first === undefined;
      return {
        ...prev,
        [activeUnit]: {
          ...unitData,
          [section]: { 
            first: isFirstTry ? score : sectionData.first, 
            current: Math.max(score, sectionData.current || 0) 
          }
        }
      };
    });
    setAppState('MENU');
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-200 selection:text-indigo-900">
      
      {appState === 'MENU' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-10 bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-700 p-6 rounded-3xl shadow-lg text-white">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="bg-white/20 p-2 rounded-xl hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-black tracking-tight">{trackTitle}</h1>
                <p className="text-white/80 font-medium">Select a unit to begin</p>
              </div>
            </div>
          </div>

          {/* Unit Cards */}
          <div className="space-y-8">
            {META_DATA.map((unit) => {
              const s = unitScores[unit.id] || {};
              const unitXP = (s.p1?.current || 0) + (s.p2?.current || 0) + (s.p3?.current || 0) + (s.p4?.current || 0);
              
              return (
                <div key={unit.id} className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                  
                  {/* Unit Title Bar */}
                  <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <h2 className="text-2xl font-black text-slate-800">Unit {String(unit.id).split('_')[0]}: {unit.title}</h2>
                      <p className="text-slate-500 font-medium mt-1">{unit.desc}</p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-bold tracking-wide">
                      {unitXP} / 40 XP
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Phase 1: 4-Column Layout */}
                    <div className="mb-6">
                      <span className="inline-block bg-slate-100 text-slate-500 px-4 py-1.5 rounded-lg text-sm font-bold tracking-widest uppercase mb-4">Phase 1: Practice</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        <button onClick={() => startMode(unit.id, 'WORD_REC')} className="group flex flex-col items-center p-5 rounded-2xl border-b-[6px] transition-all active:border-b-0 active:translate-y-[6px] bg-[#58A700] border-[#468500] hover:bg-[#468500] shadow-sm">
                          <Search className="w-10 h-10 text-white mb-3" />
                          <span className="text-white font-bold text-lg mb-4">Recognition</span>
                          <div className="bg-black/20 text-white/90 px-3 py-1.5 rounded-lg text-sm font-semibold w-full whitespace-nowrap">
                            {s.p1 ? `First: ${s.p1.first}/10 | Best: ${s.p1.current}/10` : 'Not Started'}
                          </div>
                        </button>

                        <button onClick={() => startMode(unit.id, 'SPELLING')} className="group flex flex-col items-center p-5 rounded-2xl border-b-[6px] transition-all active:border-b-0 active:translate-y-[6px] bg-[#1CB0F6] border-[#1899D6] hover:bg-[#1899D6] shadow-sm">
                          <Keyboard className="w-10 h-10 text-white mb-3" />
                          <span className="text-white font-bold text-lg mb-4">Spelling</span>
                          <div className="bg-black/20 text-white/90 px-3 py-1.5 rounded-lg text-sm font-semibold w-full whitespace-nowrap">
                            {s.p2 ? `First: ${s.p2.first}/10 | Best: ${s.p2.current}/10` : 'Not Started'}
                          </div>
                        </button>

                        <button onClick={() => startMode(unit.id, 'READ_COMP')} className="group flex flex-col items-center p-5 rounded-2xl border-b-[6px] transition-all active:border-b-0 active:translate-y-[6px] bg-[#FF9600] border-[#D17A00] hover:bg-[#E58700] shadow-sm">
                          <BookOpen className="w-10 h-10 text-white mb-3" />
                          <span className="text-white font-bold text-lg mb-4">Reading</span>
                          <div className="bg-black/20 text-white/90 px-3 py-1.5 rounded-lg text-sm font-semibold w-full whitespace-nowrap">
                            {s.p4 ? `First: ${s.p4.first}/10 | Best: ${s.p4.current}/10` : 'Not Started'}
                          </div>
                        </button>

                        <button onClick={() => startMode(unit.id, 'DICTATION')} className="group flex flex-col items-center p-5 rounded-2xl border-b-[6px] transition-all active:border-b-0 active:translate-y-[6px] bg-[#CE82FF] border-[#B560EF] hover:bg-[#C26BFF] shadow-sm">
                          <Headphones className="w-10 h-10 text-white mb-3" />
                          <span className="text-white font-bold text-lg mb-4">Listening</span>
                          <div className="bg-black/20 text-white/90 px-3 py-1.5 rounded-lg text-sm font-semibold w-full whitespace-nowrap">
                            {s.p3 ? `First: ${s.p3.first}/10 | Best: ${s.p3.current}/10` : 'Not Started'}
                          </div>
                        </button>

                      </div>
                    </div>

                    {/* Phase 2: Application */}
                    <div>
                      <span className="inline-block bg-slate-100 text-slate-500 px-4 py-1.5 rounded-lg text-sm font-bold tracking-widest uppercase mb-4">Phase 2: Application</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        <button onClick={() => startMode(unit.id, 'NOTES')} className="flex items-center px-5 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors">
                          <FileText className="w-6 h-6 mr-3 text-slate-500" /> Digital Notes
                        </button>
                        
                        <button onClick={() => startMode(unit.id, 'SHORT_QA')} className="flex items-center px-5 py-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold transition-colors border border-teal-200">
                          <PenTool className="w-6 h-6 mr-3 text-teal-600" /> Short Q&A
                        </button>
                        
                        <button onClick={() => startMode(unit.id, 'DIAGRAM')} className="flex items-center px-5 py-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold transition-colors border border-rose-200">
                          <ImageIcon className="w-6 h-6 mr-3 text-rose-600" /> Diagrams
                        </button>
                        
                        <button onClick={() => startMode(unit.id, 'ESSAY')} className="flex items-center px-5 py-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold transition-colors border border-amber-200">
                          <BookOpen className="w-6 h-6 mr-3 text-amber-600" /> Essay
                        </button>

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RENDERED COMPONENTS */}
      {appState === 'WORD_REC' && <WordRecognition pool={currentPool} onComplete={(s) => saveScore('p1', s)} onQuit={() => setAppState('MENU')} />}
      {appState === 'SPELLING' && <ContextualSpelling pool={currentPool} onComplete={(s) => saveScore('p2', s)} onQuit={() => setAppState('MENU')} />}
      {appState === 'DICTATION' && <Dictation pool={currentPool} unitId={activeUnit} onComplete={(s) => saveScore('p3', s)} onQuit={() => setAppState('MENU')} />}
      {appState === 'READ_COMP' && <ReadAndComplete pool={currentPool} unitId={activeUnit} onComplete={(s) => saveScore('p4', s)} onQuit={() => setAppState('MENU')} />}
      
      {appState === 'NOTES' && <DigitalNotes pool={currentPool} unitId={activeUnit} onQuit={() => setAppState('MENU')} />}
      {appState === 'SHORT_QA' && <ShortQA pool={currentPool} unitId={activeUnit} onComplete={() => setAppState('MENU')} onQuit={() => setAppState('MENU')} />}
      {appState === 'ESSAY' && <GuidedEssay pool={currentPool} unitId={activeUnit} onComplete={() => setAppState('MENU')} onQuit={() => setAppState('MENU')} />}
      {appState === 'DIAGRAM' && <DiagramAnalysis unitId={activeUnit} onComplete={() => setAppState('MENU')} onQuit={() => setAppState('MENU')} />}
      {appState === 'SPEAKING' && <SpeakingTask unitId={activeUnit} onComplete={() => setAppState('MENU')} onQuit={() => setAppState('MENU')} />}
    </div>
  );
}