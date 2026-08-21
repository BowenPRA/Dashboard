import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './views/Home';
import YearDashboard from './views/YearDashboard';
import Today from './views/Today';

// NEW IMPORTS
import TeacherRoute from './components/TeacherRoute';
import TeacherDashboard from './views/TeacherDashboard';
import StudyPlan from './views/StudyPlan';
import { TRACK_IDS } from './components/trackRegistry';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1. The Gatekeeper */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. The Main Menu */}
        <Route path="/home" element={<Home />} />

        {/* 2b. The day's assignment — two units, derived from studyPlanConfig.js */}
        <Route path="/today" element={<Today />} />

        {/* 3. The Curricular Tracks — generated from TRACK_REGISTRY, so adding a
            track there is all that is needed for it to route. */}
        {TRACK_IDS.map(id => (
          <Route key={id} path={`/${id}`} element={<YearDashboard track={id} />} />
        ))}
        
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
    </Router>
  );
}