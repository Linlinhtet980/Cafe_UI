import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import styles from './Logout.module.css';

export default function Logout({ className = '' }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!window.confirm('အကောင့်မှ ထွက်ခွာရန် သေချာပါသလား?')) {
      return;
    }

    setLoading(true);
    try {
      // 1. Call Cafe_Api /api/auth/logout to set refreshToken to null in the database
      await api.post('/api/auth/logout');
      toast.success('အကောင့်မှ အောင်မြင်စွာ ထွက်ခွာပြီးပါပြီ');
    } catch (error) {
      console.error('Logout error:', error);
      // If token expired or network issue, still notify user
      toast.info('အကောင့်မှ ထွက်ခွာပြီးပါပြီ');
    } finally {
      
      // 2. Clear tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      setLoading(false);

      // 3. Redirect back to login page
      navigate('/login');
    }
  };

  return (
    <button
      type="button"
      className={`${styles.logoutBtn} ${className}`}
      onClick={handleLogout}
      disabled={loading}
      title="Logout"
    >
      <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-arrow-right-from-bracket'}`}></i>
    </button>
  );
}

