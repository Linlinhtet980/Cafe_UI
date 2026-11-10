import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import styles from './Logout.module.css';

export default function Logout({ className = '' }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!window.confirm('အကောင့်မှ ထွက်ခွာရန် သေချာပါသလား?')) {
      return;
    }

    setLoading(true);
    try {
      await logout();
      toast.success('အကောင့်မှ အောင်မြင်စွာ ထွက်ခွာပြီးပါပြီ');
    } catch (error) {
      console.error('Logout error:', error);
      toast.info('အကောင့်မှ ထွက်ခွာပြီးပါပြီ');
    } finally {
      setLoading(false);
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

