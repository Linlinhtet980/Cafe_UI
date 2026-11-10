import { Route } from 'react-router-dom';
import Auth from '../pages/auth/Auth';

export const authRoutes = (
  <>
    <Route path="/auth" element={<Auth />} />
    <Route path="/login" element={<Auth />} />
  </>
);
