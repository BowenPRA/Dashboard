import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { User, KeyRound, Loader2, AlertTriangle, BookOpen, Sparkles } from 'lucide-react';

export default function Login() {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim() || !pin.trim()) return;

    setIsLoading(true);
    setErrorMsg('');

    // --- The Classroom Translation Magic ---
    const formattedEmail = `${name.toLowerCase().trim()}@science.local`;
    const formattedPassword = `${pin.trim()}-y8s`;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formattedEmail,
        password: formattedPassword,
      });

      if (error) {
        throw new Error("Incorrect Name or Secret Code. Please try again.");
      }

      if (data.user) {
        navigate('/home');
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-100 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Vibrant Ambient Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400 opacity-25 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400 opacity-25 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-pink-400 opacity-20 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 duration-500">
        
        {/* Decorative Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-400 blur-2xl opacity-40 rounded-full"></div>
            <div className="relative w-28 h-28 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white rounded-[2rem] flex items-center justify-center shadow-xl transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 border border-indigo-300">
              <BookOpen className="w-14 h-14" strokeWidth={2.5} />
              <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-yellow-300 animate-pulse drop-shadow-md" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600">
            Learning Dashboard
          </h1>
          <p className="text-indigo-600 font-black text-xs tracking-[0.25em] uppercase bg-indigo-100/60 px-5 py-2 rounded-full inline-block border border-indigo-200 shadow-sm backdrop-blur-sm">
            Student Portal
          </p>
        </div>

        {/* Glassmorphism Login Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 sm:p-10 border border-white">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-2">
                First Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                  <User className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bowen"
                  disabled={isLoading}
                  className="w-full pl-14 pr-5 py-4 bg-slate-50/50 border-2 border-slate-200 rounded-2xl text-lg font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-300 placeholder:font-medium shadow-sm"
                />
              </div>
            </div>

            {/* PIN Input */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-2">
                Secret Code
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <KeyRound className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
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
                  className="w-full pl-14 pr-5 py-4 bg-slate-50/50 border-2 border-slate-200 rounded-2xl text-lg font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-300 tracking-[0.3em] shadow-sm"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-start bg-rose-50 text-rose-700 px-5 py-4 rounded-2xl border border-rose-200 animate-in fade-in slide-in-from-top-2 shadow-sm">
                <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                <p className="font-bold text-sm leading-snug">{errorMsg}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !name.trim() || !pin.trim()}
              className="w-full mt-8 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative flex items-center justify-center px-8 py-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-2xl font-black text-xl tracking-widest uppercase border-b-[6px] border-indigo-800 hover:from-blue-400 hover:via-indigo-400 hover:to-purple-400 active:border-b-0 active:translate-y-[6px] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md">
                {isLoading ? <Loader2 className="w-7 h-7 animate-spin" /> : 'Enter'}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}