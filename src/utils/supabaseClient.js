import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { TRACK_REGISTRY } from '../components/trackRegistry';

// The single Supabase client for the whole app. Having a second createClient in
// another module spins up a second GoTrueClient on the same storage key, which
// Supabase warns about and which caused subtly divergent auth/session reads.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const getGlobalGameLeaderboard = async (unitId, limit = 5) => {
  try {
    const { data, error } = await supabase.rpc('get_unit_leaderboard', {
      target_unit_id: unitId
    });

    if (error) throw error;

    const sortedData = (data || []).sort((a, b) => b.score - a.score).slice(0, limit);
    return { data: sortedData, error: null };
  } catch (err) {
    console.error('Failed to parse leaderboard profiles:', err);
    return { data: null, error: err.message };
  }
};

export function useStudentProgress(navigate, track = 'GED_MATH') {
  const [user, setUser] = useState(null);

  const initialProgress = {};
  TRACK_REGISTRY.forEach(t => { initialProgress[t.id] = {}; });
  const [allProgress, setAllProgress] = useState(initialProgress);
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

      const validTracks = TRACK_REGISTRY.map(t => t.id);
      let dbProgress = data?.progress || {};
      let needsUpdate = false;
      const newFormat = {};

      validTracks.forEach(t => {
        newFormat[t] = dbProgress[t] || {};
      });

      const isSuperOldFormat = !Object.keys(dbProgress).some(key => ['Y8', 'Y9', 'ESL', 'GED', 'GED_MATH', 'GED_ENG', 'ADD_MATH', 'GED_HISTORY'].includes(key)) && Object.keys(dbProgress).length > 0;

      if (isSuperOldFormat) {
        newFormat['GED_MATH'] = dbProgress;
        needsUpdate = true;
      } else {
        const hasInvalidKeys = Object.keys(dbProgress).some(key => !validTracks.includes(key));
        if (hasInvalidKeys) {
          if (dbProgress['GED'] && Object.keys(newFormat['GED_ENG']).length === 0) {
            newFormat['GED_ENG'] = dbProgress['GED'];
          }
          needsUpdate = true;
        } else {
          validTracks.forEach(t => {
            if (!dbProgress[t]) needsUpdate = true;
          });
        }
      }

      setAllProgress(newFormat);

      if (needsUpdate) {
        await supabase.from('students').update({ progress: newFormat }).eq('id', session.user.id);
      }

      setIsLoadingDB(false);
    };

    fetchProgress();
  }, [navigate]);

  const saveScore = async (unitId, section, score, answers = null) => {
    // Functional update with a deep clone entirely prevents stale closures when
    // several tasks save in quick succession.
    setAllProgress(prev => {
      const newProgress = JSON.parse(JSON.stringify(prev));

      if (!newProgress[track]) newProgress[track] = {};
      if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

      const existingScore = newProgress[track][unitId][section]?.current || 0;

      // Number() so threshold logic never trips over a stringified score.
      newProgress[track][unitId][section] = {
        current: Math.max(existingScore, Number(score) || 0),
        answers: answers || newProgress[track][unitId][section]?.answers || null
      };

      // Fire and forget so the UI doesn't wait on the round-trip.
      supabase.from('students').update({ progress: newProgress }).eq('id', user.id)
        .then(({ error }) => { if (error) console.error("Supabase Save Error:", error); });

      return newProgress;
    });
  };

  const addStrike = async (unitId, newStrikes) => {
    setAllProgress(prev => {
      const newProgress = JSON.parse(JSON.stringify(prev));

      if (!newProgress[track]) newProgress[track] = {};
      if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

      newProgress[track][unitId].strikes = newStrikes;

      supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
      return newProgress;
    });
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
