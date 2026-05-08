import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { User, KeyRound, Loader2, AlertTriangle, Atom } from 'lucide-react';

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
    // Converts "Kun" to "kun@science.local"
    const formattedEmail = `${name.toLowerCase().trim()}@science.local`;
    // Converts "002" to "002-y8s" to bypass the 6-character minimum
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
        // Successful Login! Route to the dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 selection:bg-indigo-200 selection:text-indigo-900">
      
      {/* Decorative Header */}
      <div className="mb-8 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-6 rotate-3">
          <Atom className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Science Dashboard</h1>
        <p className="text-slate-500 font-medium text-lg tracking-wide uppercase">Year 8 Curriculum</p>
      </div>

      {/* Login Card */}
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 sm:p-10 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Student Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <User className="h-6 w-6 text-slate-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Meelo"
                disabled={isLoading}
                className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-lg font-medium text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* PIN Input */}
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
              Secret Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <KeyRound className="h-6 w-6 text-slate-400" />
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
                className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-lg font-medium text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors placeholder:text-slate-300 tracking-widest"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="flex items-start bg-red-50 text-red-600 px-5 py-4 rounded-2xl border border-red-100 animate-in fade-in">
              <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
              <p className="font-semibold text-sm leading-snug">{errorMsg}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !name.trim() || !pin.trim()}
            className="w-full flex items-center justify-center px-8 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-indigo-800 hover:bg-indigo-700 active:border-b-0 active:translate-y-[6px] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md mt-4"
          >
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : 'Enter Lab'}
          </button>
        </form>
      </div>
    </div>
  );
}