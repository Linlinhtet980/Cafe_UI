import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import AuthTabs from '../../components/Auth/AuthTabs';
import LoginForm from '../../components/Auth/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm';
import styles from './Auth.module.css';

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.warning('⚠️ အီးမေးလ်နှင့် စကားဝှက် ထည့်သွင်းရန် လိုအပ်ပါသည်');
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('🎉 Login အောင်မြင်ပါသည်!');
      navigate('/dashboard');
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Login failed. Please try again.';
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.warning('⚠️ အချက်အလက်များ အားလုံး ပြည့်စုံစွာ ဖြည့်သွင်းပါ');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('❌ Password နှင့် Confirm Password တူညီမှု မရှိပါ');
      return;
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('🎉 အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်! ကျေးဇူးပြု၍ Login ဝင်ပါ');
      setIsLogin(true);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Registration failed. Please try again.';
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authHeaderBar}>
        <button type="button" className={styles.themeToggleBtn} onClick={toggleTheme}>
          {theme === 'light' ? (
            <>
              <i className="fa-solid fa-moon"></i> Dark Mode
            </>
          ) : (
            <>
              <i className="fa-solid fa-sun"></i> Light Mode
            </>
          )}
        </button>
      </div>

      <div className={styles.authCard}>
        <AuthTabs isLogin={isLogin} onSwitchTab={setIsLogin} />

        {isLogin ? (
          <LoginForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleLogin}
            loading={loading}
          />
        ) : (
          <RegisterForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleRegister}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
