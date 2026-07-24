import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient'; // Ensure this path matches your project
import { Loader2 } from 'lucide-react';

export default function TeacherRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkTeacherAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Trust app_metadata only — user_metadata is user-writable, so a student
      // could set role:'teacher' on themselves. This gate is display-only; the
      // backend admin endpoints independently verify app_metadata.role too.
      if (!session || session.user.app_metadata?.role !== 'teacher') {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkTeacherAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6]" strokeWidth={3} />
      </div>
    );
  }

  // Bounce unauthorized users (students) to their standard home dashboard
  if (!isAuthorized) {
    return <Navigate to="/home" replace />;
  }

  // If they pass the check, render the Teacher Dashboard!
  return children;
}