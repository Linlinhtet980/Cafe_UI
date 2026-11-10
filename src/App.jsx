import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Users from './pages/admin/users/Users';
import Auth from './pages/auth/Auth';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Auth />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
          </Route>

          <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
