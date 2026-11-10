import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes } from './authRoutes';
import { adminRoutes } from './adminRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      {authRoutes}
      {adminRoutes}

      <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
