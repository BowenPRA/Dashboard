import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Atom, Leaf, Languages, GraduationCap, ChevronRight, BookOpen } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  // Mapping themes to perfectly match the YearDashboard.jsx configurations
  const tracks = [
    { 
      id: 'Y8', title: 'Year 8 Science', desc: 'Biology & Chemistry', icon: Atom, 
      theme: { banner: 'from-indigo-500 via-indigo-600 to-blue-700', border: 'border-indigo-800', hover: 'hover:bg-indigo-600' }
    },
    { 
      id: 'Y9', title: 'Year 9 Science', desc: 'Ecology & Physics', icon: Leaf, 
      theme: { banner: 'from-emerald-500 via-emerald-600 to-teal-700', border: 'border-teal-800', hover: 'hover:bg-emerald-600' }
    },
    { 
      id: 'ESL', title: 'ESL Foundation', desc: 'Core Vocab & Phonics', icon: Languages, 
      theme: { banner: 'from-amber-500 via-amber-600 to-orange-700', border: 'border-orange-800', hover: 'hover:bg-amber-600' }
    },
    { 
      id: 'GED', title: 'English', desc: 'Reading & Language', icon: GraduationCap, 
      theme: { banner: 'from-rose-500 via-rose-600 to-red-700', border: 'border-red-800', hover: 'hover:bg-rose-600' }
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden font-sans selection:bg-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      
      {/* Vibrant Ambient Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400 opacity-20 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-400 opacity-20 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-400 opacity-15 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="relative z-10 w-full max-w-5xl">
        
        <div className="mb-12 text-center animate-in fade-in slide-in-from-top-8 duration-500">
          <div className="inline-flex items-center justify-center p-4 bg-white/60 rounded-3xl shadow-md border border-white/80 backdrop-blur-md mb-6 transform hover:scale-105 transition-transform">
             <BookOpen className="w-10 h-10 text-indigo-600" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-sm">
            Learning Dashboard
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-bold bg-white/80 inline-block px-8 py-3 rounded-full border border-slate-200/80 backdrop-blur-md shadow-sm">
            Select your learning track to begin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {tracks.map((t, index) => (
            <button 
              key={t.id}
              onClick={() => navigate(`/${t.id}`)}
              className={`group relative w-full text-left flex flex-col p-8 sm:p-10 rounded-[2.5rem] shadow-xl border-b-[8px] transition-all duration-300 transform active:translate-y-[8px] active:border-b-0 bg-gradient-to-br ${t.theme.banner} ${t.theme.border} hover:shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8`}
              style={{ animationFillMode: 'both', animationDelay: `${index * 100}ms` }}
            >
              
              {/* Internal Glare Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 pointer-events-none"></div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex flex-col">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/30 shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                    <t.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight drop-shadow-md">
                    {t.title}
                  </h2>
                  <p className="text-white/80 font-bold text-base sm:text-lg tracking-wide drop-shadow-sm">
                    {t.desc}
                  </p>
                </div>

                <div className="hidden sm:flex w-14 h-14 rounded-full bg-white/20 items-center justify-center text-white backdrop-blur-md border border-white/30 shadow-sm group-hover:bg-white group-hover:text-slate-800 transition-colors transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300">
                  <ChevronRight className="w-7 h-7" strokeWidth={3} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}