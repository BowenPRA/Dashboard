import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './views/Home';
import YearDashboard from './views/YearDashboard';

// NEW IMPORTS
import TeacherRoute from './components/TeacherRoute';
import TeacherDashboard from './views/TeacherDashboard'; 

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1. The Gatekeeper */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. The Main Menu */}
        <Route path="/home" element={<Home />} />
        
        {/* 3. The Curricular Tracks */}
        <Route path="/GED_MATH" element={<YearDashboard track="GED_MATH" />} />
        <Route path="/GED_ENG" element={<YearDashboard track="GED_ENG" />} />
        <Route path="/Y8" element={<YearDashboard track="Y8" />} />
        <Route path="/Y9" element={<YearDashboard track="Y9" />} />
        <Route path="/ESL" element={<YearDashboard track="ESL" />} />
        <Route path="/ADD_MATH" element={<YearDashboard track="ADD_MATH" />} />
        
        {/* NEW: Protected Teacher Route */}
        <Route 
          path="/teacher-dashboard" 
          element={
            <TeacherRoute>
              <TeacherDashboard />
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