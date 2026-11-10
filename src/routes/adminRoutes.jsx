import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import Users from '../pages/admin/users/Users';

export const adminRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="users" element={<Users />} />
    </Route>
  </Route>
);
