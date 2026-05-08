import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, Search, Keyboard, Headphones, FileText, PenTool, Image as ImageIcon } from 'lucide-react';

// TEMPORARILY COMMENTED OUT UNTIL WE MIGRATE YOUR OLD FILES
// import { Y8_META, Y8_DATA, Y9_META, Y9_DATA, ESL_META, ESL_DATA, GED_META, GED_DATA } from '../data/units/index';
// import WordRecognition from '../components/WordRecognition';
// import ContextualSpelling from '../components/ContextualSpelling';
// import ReadAndComplete from '../components/ReadAndComplete';
// import Dictation from '../components/Dictation';
// import DigitalNotes from '../components/DigitalNotes';
// import ShortQA from '../components/ShortQA';
// import GuidedEssay from '../components/GuidedEssay';
// import DiagramAnalysis from '../components/DiagramAnalysis';
// import SpeakingTask from '../components/SpeakingTask';

export default function YearDashboard({ track }) {
  const navigate = useNavigate();
  const [appState, setAppState] = useState('MENU');
  
  // Fake data just to render the UI for testing
  const dummyMeta = [
    { id: 'temp_1', title: 'Example Unit 1', desc: 'Migrate data to see real units.' },
    { id: 'temp_2', title: 'Example Unit 2', desc: 'Placeholder text.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-200 selection:text-indigo-900">
      
      {appState === 'MENU' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-10 bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-700 p-6 rounded-3xl shadow-lg text-white">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/home')} className="bg-white/20 p-2 rounded-xl hover:bg-white/30 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-black tracking-tight">{track} Dashboard</h1>
                <p className="text-white/80 font-medium">Select a unit to begin</p>
              </div>
            </div>
          </div>

          {/* Unit Cards */}
          <div className="space-y-8">
            {dummyMeta.map((unit) => (
                <div key={unit.id} className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                  
                  <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <h2 className="text-2xl font-black text-slate-800">{unit.title}</h2>
                      <p className="text-slate-500 font-medium mt-1">{unit.desc}</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="mb-6">
                      <span className="inline-block bg-slate-100 text-slate-500 px-4 py-1.5 rounded-lg text-sm font-bold tracking-widest uppercase mb-4">Phase 1: Practice</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        <button onClick={() => setAppState('PLACEHOLDER')} className="group flex flex-col items-center p-5 rounded-2xl border-b-[6px] transition-all active:border-b-0 active:translate-y-[6px] bg-[#58A700] border-[#468500] hover:bg-[#468500] shadow-sm">
                          <Search className="w-10 h-10 text-white mb-3" />
                          <span className="text-white font-bold text-lg mb-4">Recognition</span>
                        </button>

                        <button onClick={() => setAppState('PLACEHOLDER')} className="group flex flex-col items-center p-5 rounded-2xl border-b-[6px] transition-all active:border-b-0 active:translate-y-[6px] bg-[#1CB0F6] border-[#1899D6] hover:bg-[#1899D6] shadow-sm">
                          <Keyboard className="w-10 h-10 text-white mb-3" />
                          <span className="text-white font-bold text-lg mb-4">Spelling</span>
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Placeholder screen when they click a game */}
      {appState === 'PLACEHOLDER' && (
          <div className="min-h-screen flex flex-col items-center justify-center p-10">
              <h2 className="text-4xl font-black text-slate-800 mb-4">Under Construction 🚧</h2>
              <p className="text-xl text-slate-600 mb-8">We haven't migrated this mini-game yet!</p>
              <button onClick={() => setAppState('MENU')} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl">Go Back</button>
          </div>
      )}

    </div>
  );
}