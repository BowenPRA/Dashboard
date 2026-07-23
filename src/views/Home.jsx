import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, LayoutDashboard, Sun, Moon, Loader2 } from 'lucide-react';
import { TRACK_REGISTRY } from '../components/trackRegistry';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [visibleTracks, setVisibleTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) document.documentElement.classList.add('dark');

    // Students with no explicit enrolment see the full GED programme.
    const defaultTracks = TRACK_REGISTRY.filter(t => t.group === 'GED');

    const fetchUserAndTracks = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const enrolled = session?.user?.user_metadata?.enrolled_tracks;

      if (Array.isArray(enrolled) && enrolled.length > 0) {
        // RBAC: only show enrolled tracks
        setVisibleTracks(TRACK_REGISTRY.filter(t => enrolled.includes(t.id)));
      } else {
        setVisibleTracks(defaultTracks);
      }
      setLoading(false);
    };

    fetchUserAndTracks();
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-6" strokeWidth={3} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      <button 
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-3 rounded-2xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 shadow-sm z-50"
        title="Toggle Dark Mode"
      >
        {isDark ? <Sun className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
      </button>

      <div className="relative z-10 w-full max-w-5xl">
        
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border-2 border-slate-200 dark:border-slate-800 mb-8 border-b-[6px] transform hover:-translate-y-1 transition-transform">
             <LayoutDashboard className="w-10 h-10 text-slate-800 dark:text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-slate-800 dark:text-white drop-shadow-sm">
            Curriculum
          </h1>
          <p className="text-sm font-black tracking-widest uppercase text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 inline-block px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
            Select Learning Track
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {visibleTracks.map((t, index) => {
            const Icon = t.icon;
            return (
              <button 
                key={t.id}
                onClick={() => navigate(`/${t.id}`)}
                className="group relative w-full text-left flex flex-col p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 transition-all duration-200 active:translate-y-[8px] active:border-b-2 bg-white dark:bg-slate-900 border-b-[8px] hover:border-slate-300 dark:hover:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-bottom-8"
                style={{ animationFillMode: 'both', animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                    <div className={`w-16 h-16 ${t.theme.bg} rounded-2xl flex items-center justify-center mb-6 shadow-sm border-b-[4px] ${t.theme.border} group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 text-white ${t.id === 'ESL' ? 'text-amber-950' : ''} drop-shadow-sm`} strokeWidth={2.5} />
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white mb-2 tracking-tight group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                      {t.title}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-base tracking-wide">
                      {t.desc}
                    </p>
                  </div>

                  <div className="hidden sm:flex w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-700 shadow-sm group-hover:bg-[#1cb0f6] group-hover:border-[#1899d6] group-hover:text-white transition-all transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300 border-b-[4px] group-hover:border-b-[4px]">
                    <ChevronRight className="w-7 h-7" strokeWidth={3} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}