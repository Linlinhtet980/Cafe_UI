import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/Logo/Logo';
import styles from './Auth.module.css';

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [theme, setTheme] = useState('light');
  const [showPassword, setShowPassword] = useState(false);
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
      await api.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

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

  const switchTab = (toLogin) => {
    setIsLogin(toLogin);
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
        <div className={styles.authBrand}>
          <Logo text="Cafe House" size="large" />
          <p>{isLogin ? 'သင့်အကောင့်သို့ ဝင်ရောက်ပါ' : 'အကောင့်အသစ် ဖွင့်လှစ်ပါ'}</p>
        </div>

        <div className={styles.authTabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${isLogin ? styles.active : ''}`}
            onClick={() => switchTab(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${!isLogin ? styles.active : ''}`}
            onClick={() => switchTab(false)}
          >
            Register
          </button>
        </div>

        <form className={styles.authForm} onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name">အမည် (Name)</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="မောင်မောင်"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">အီးမေးလ် (Email)</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">စကားဝှက် (Password)</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className={styles.passwordToggleBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">စကားဝှက် အတည်ပြုပါ (Confirm Password)</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className={styles.formExtras}>
              <label className={styles.rememberMe}>
                <input type="checkbox" /> မှတ်ထားရန်
              </label>
              <a href="#forgot" className={styles.forgotLink}>စကားဝှက်မေ့နေပါသလား?</a>
            </div>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span>ခေတ္တစောင့်ဆိုင်းပါ...</span>
            ) : isLogin ? (
              'Login ဝင်ရောက်မည်'
            ) : (
              'အကောင့်ဖွင့်မည်'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
