import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { User, KeyRound, Loader2, AlertTriangle, BookOpen, Sparkles, Sun, Moon } from 'lucide-react';

export default function Login() {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) document.documentElement.classList.add('dark');
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim() || !pin.trim()) return;

    setIsLoading(true);
    setErrorMsg('');

    const formattedEmail = `${name.toLowerCase().trim()}@science.local`;
    const formattedPassword = `${pin.trim()}-y8s`;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formattedEmail,
        password: formattedPassword,
      });

      if (error) throw new Error("Incorrect Name or Secret Code. Please try again.");
      
      if (data.user) {
        // Check the metadata role to fork the routing
        const userRole = data.user.user_metadata?.role;
        
        if (userRole === 'teacher') {
          navigate('/teacher-dashboard');
        } else {
          // Standard student behavior - Route to Home selection menu
          navigate('/home');
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 font-sans overflow-hidden bg-slate-50 dark:bg-slate-950 selection:bg-indigo-200 transition-colors duration-300">
      
      {/* Absolute Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-3 rounded-2xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 shadow-sm z-50"
        title="Toggle Dark Mode"
      >
        {isDark ? <Sun className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
      </button>

      {/* Playful Ambient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#1cb0f6] opacity-10 dark:opacity-20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#58cc02] opacity-10 dark:opacity-15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 duration-500">
        
        {/* Gamified Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="relative mb-6">
            <div className="relative w-24 h-24 bg-[#1cb0f6] text-white rounded-[2rem] flex items-center justify-center shadow-sm border-b-[6px] border-[#1899d6] transform hover:scale-[1.05] active:scale-95 active:border-b-0 active:translate-y-[6px] transition-all duration-200 cursor-default">
              <BookOpen className="w-12 h-12 drop-shadow-sm" strokeWidth={2.5} />
              <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-[#ffc800] animate-bounce drop-shadow-sm" strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-slate-800 dark:text-white drop-shadow-sm">
            Student Portal
          </h1>
          <p className="text-[#1cb0f6] font-black text-xs tracking-widest uppercase bg-white dark:bg-slate-900 px-5 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
            Welcome Back!
          </p>
        </div>

        {/* Tactile Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border-2 border-slate-200 dark:border-slate-800 p-8 sm:p-10 transition-colors">
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-2">
                First Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors">
                  <User className="h-6 w-6 text-slate-400 group-focus-within:text-[#1cb0f6] transition-colors" strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bowen"
                  disabled={isLoading}
                  className="w-full pl-14 pr-5 py-4 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-lg font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#1cb0f6] focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400 shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-2">
                Secret Code
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <KeyRound className="h-6 w-6 text-slate-400 group-focus-within:text-[#1cb0f6] transition-colors" strokeWidth={2.5} />
                </div>
                <input
                  type="password"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="000"
                  maxLength={3}
                  disabled={isLoading}
                  className="w-full pl-14 pr-5 py-4 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-xl font-black text-slate-800 dark:text-white focus:outline-none focus:border-[#1cb0f6] focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400 tracking-[0.4em] shadow-inner"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-start bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 px-5 py-4 rounded-2xl border-2 border-rose-300 dark:border-rose-800 animate-in fade-in slide-in-from-top-2">
                <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <p className="font-bold text-sm leading-snug">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !name.trim() || !pin.trim()}
              className="w-full mt-8 flex items-center justify-center px-8 py-5 bg-[#1cb0f6] text-white rounded-2xl font-black text-xl tracking-widest uppercase hover:bg-[#159bd9] border-b-[6px] border-[#1899d6] active:border-b-0 active:translate-y-[6px] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {isLoading ? <Loader2 className="w-7 h-7 animate-spin" /> : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}