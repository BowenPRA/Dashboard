import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Login from './pages/Login';
import TeacherRoute from './components/TeacherRoute';
import { TRACK_IDS, ARCADE_TRACK_ID } from './components/trackRegistry';

// Every view behind the login pulls in the whole content library (src/data is one
// eager glob). Loading them lazily keeps that out of the entry chunk, so the login
// screen paints without waiting on several megabytes of lessons.
const Home = lazy(() => import('./views/Home'));
const YearDashboard = lazy(() => import('./views/YearDashboard'));
const Today = lazy(() => import('./views/Today'));
const Arcade = lazy(() => import('./views/Arcade'));
const Writing = lazy(() => import('./views/Writing'));
const TeacherDashboard = lazy(() => import('./views/TeacherDashboard'));
const StudyPlan = lazy(() => import('./views/StudyPlan'));

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950" role="status" aria-label="Loading">
      <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6]" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* 1. The Gatekeeper */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. The Main Menu */}
        <Route path="/home" element={<Home />} />

        {/* 2b. The day's assignment — two units, derived from studyPlanConfig.js */}
        <Route path="/today" element={<Today />} />

        {/* 2c. Every GED essay the student has written, read back — utils/essayArchive.js */}
        <Route path="/writing" element={<Writing />} />

        {/* 3. The Curricular Tracks — generated from TRACK_REGISTRY, so adding a
            track there is all that is needed for it to route. The Arcade is a
            track too, but it holds games rather than lessons, so it gets its own
            view instead of the unit dashboard. */}
        {TRACK_IDS.filter(id => id !== ARCADE_TRACK_ID).map(id => (
          <Route key={id} path={`/${id}`} element={<YearDashboard track={id} />} />
        ))}

        {/* 3b. The Arcade — games bought with gold earned by studying. */}
        <Route path={`/${ARCADE_TRACK_ID}`} element={<Arcade />} />
        
        {/* NEW: Protected Teacher Route */}
        <Route 
          path="/teacher-dashboard" 
          element={
            <TeacherRoute>
              <TeacherDashboard />
            </TeacherRoute>
          }
        />

        {/* NEW: Teacher view of the plan — coverage, rotation load, build queue */}
        <Route
          path="/study-plan"
          element={
            <TeacherRoute>
              <StudyPlan />
            </TeacherRoute>
          }
        />

        {/* Default Fallback: Force everyone to login first */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      </Suspense>
    </Router>
  );
}