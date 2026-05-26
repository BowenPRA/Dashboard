import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './views/Home';
import YearDashboard from './views/YearDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1. The Gatekeeper */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. The Main Menu */}
        <Route path="/home" element={<Home />} />
        
        {/* 3. The Curricular Tracks */}
        <Route path="/Y8" element={<YearDashboard track="Y8" />} />
        <Route path="/Y9" element={<YearDashboard track="Y9" />} />
        <Route path="/ESL" element={<YearDashboard track="ESL" />} />
        <Route path="/GED" element={<YearDashboard track="GED" />} />
        
        {/* Default Fallback: Force everyone to login first */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}