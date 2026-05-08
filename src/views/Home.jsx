import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Atom, Leaf, Languages, GraduationCap } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-4">Science Vocab Review</h1>
        <p className="text-xl text-slate-500 font-medium">Select your learning track to begin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* Year 8 Card */}
        <button 
          onClick={() => navigate('/Y8')}
          className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border-2 border-transparent hover:border-indigo-500 transition-all active:scale-95 text-left flex items-center"
        >
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
            <Atom className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Year 8 Science</h2>
            <p className="text-slate-500 font-medium mt-1">Human Biology & Chemistry</p>
          </div>
        </button>

        {/* Year 9 Card */}
        <button 
          onClick={() => navigate('/Y9')}
          className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border-2 border-transparent hover:emerald-500 transition-all active:scale-95 text-left flex items-center"
        >
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
            <Leaf className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Year 9 Science</h2>
            <p className="text-slate-500 font-medium mt-1">Photosynthesis & Ecosystems</p>
          </div>
        </button>

        {/* ESL Card */}
        <button 
          onClick={() => navigate('/ESL')}
          className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border-2 border-transparent hover:border-amber-500 transition-all active:scale-95 text-left flex items-center"
        >
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
            <Languages className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">ESL Foundation</h2>
            <p className="text-slate-500 font-medium mt-1">Core Vocabulary & Phonics</p>
          </div>
        </button>

        {/* GED Card */}
        <button 
          onClick={() => navigate('/GED')}
          className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border-2 border-transparent hover:border-rose-500 transition-all active:scale-95 text-left flex items-center"
        >
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">GED Prep</h2>
            <p className="text-slate-500 font-medium mt-1">Reading & Language Arts</p>
          </div>
        </button>

      </div>
    </div>
  );
}