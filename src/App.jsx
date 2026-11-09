import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Users from './pages/admin/users/Users';
import Auth from './pages/auth/Auth';

export default function App() {
  return (
    <BrowserRouter>
      {/* ─── Global Toast Notification Container ─── */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* ─── Standalone Auth Page (Login / Register) ─── */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Auth />} />

        {/* ─── Admin Panel Nested Routes ─── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* ─── Redirect /dashboard, root and unknown paths to /admin ─── */}
        <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
