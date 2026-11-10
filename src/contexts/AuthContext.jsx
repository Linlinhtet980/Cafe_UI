/* eslint-disable react-refresh/only-export-components */
import  { createContext, useState, useContext } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (err) {
        console.error('Failed to parse stored user', err);
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    const { accessToken, refreshToken, user: userData } = response.data.message;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }

    return response;
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
