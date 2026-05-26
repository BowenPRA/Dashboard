import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Ensure this matches how you initialize Supabase in your project!
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// --- UPDATED LEADERBOARD SERVICE ---
// Queries all students, parses JSONB progress for the unit, and ranks the Top 5.
export const getGlobalGameLeaderboard = async (unitId, limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('id, display_name, progress');
      
    if (error) {
      console.error("DEBUG - Supabase Error:", error);
      throw error;
    }

    let parsedScores = [];
    
    data.forEach(student => {
      const name = student.display_name || 'Anonymous Agent';
      let maxScore = 0;
      
      ['Y8', 'Y9', 'ESL', 'GED'].forEach(track => {
        const unitData = student.progress?.[track]?.[unitId];
        if (unitData) {
          // Check standard game keys
          const gameScore = unitData.GAMES?.current || 0;
          const gameLowerScore = unitData.games?.current || 0;
          
          // Only use p12 if it's over 100 (meaning it was genuinely used for an arcade score, not a 10-pt quiz)
          const p12Score = (unitData.p12?.current > 100) ? unitData.p12.current : 0;
          
          maxScore = Math.max(maxScore, gameScore, gameLowerScore, p12Score);
        }
      });

      if (maxScore > 0) {
        parsedScores.push({ 
          id: student.id,
          name, 
          score: maxScore
        });
      }
    });

    parsedScores.sort((a, b) => b.score - a.score);
    return { data: parsedScores.slice(0, limit), error: null };
  } catch (err) {
    console.error('Failed to parse leaderboard profiles:', err);
    return { data: null, error: err.message };
  }
};

export function useStudentProgress(navigate, track = 'Y9') {
  const [user, setUser] = useState(null);
  const [allProgress, setAllProgress] = useState({
    Y8: {},
    Y9: {},
    ESL: {},
    GED: {}
  });
  const [isLoadingDB, setIsLoadingDB] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }
      
      setUser(session.user);

      const { data } = await supabase
        .from('students')
        .select('progress')
        .eq('id', session.user.id)
        .single();

      if (data && data.progress) {
        let dbProgress = data.progress;
        const validTracks = ['Y8', 'Y9', 'ESL', 'GED'];

        const isOldFormat = Object.keys(dbProgress).some(key => !validTracks.includes(key));
        if (isOldFormat) {
          dbProgress = {
            Y8: {},
            Y9: dbProgress,
            ESL: {},
            GED: {}
          };
          await supabase.from('students').update({ progress: dbProgress }).eq('id', session.user.id);
        } else {
          validTracks.forEach(t => {
            if (!dbProgress[t]) dbProgress[t] = {};
          });
        }

        setAllProgress(dbProgress);
      }
      
      setIsLoadingDB(false);
    };

    fetchProgress();
  }, [navigate]);

  const saveScore = async (unitId, section, score, answers = null) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    const existingScore = newProgress[track][unitId][section]?.current || 0;

    newProgress[track][unitId] = {
      ...newProgress[track][unitId],
      [section]: {
        current: Math.max(existingScore, score),
        answers: answers || newProgress[track][unitId][section]?.answers || null
      }
    };

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const addStrike = async (unitId, newStrikes) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    newProgress[track][unitId].strikes = newStrikes;

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return { 
    user, 
    allProgress, 
    unitScores: allProgress[track] || {}, 
    isLoadingDB, 
    saveScore, 
    addStrike, 
    handleLogout 
  };
}