import { useState } from 'react';
import styles from './Auth.module.css';

export default function RegisterForm({ formData, onChange, onSubmit, loading }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className={styles.authForm} onSubmit={onSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">အမည် (Name)</label>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="မောင်မောင်"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">အီးမေးလ် (Email)</label>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={onChange}
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
            onChange={onChange}
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

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">စကားဝှက် အတည်ပြုပါ (Confirm Password)</label>
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? <span>ခေတ္တစောင့်ဆိုင်းပါ...</span> : 'အကောင့်ဖွင့်မည်'}
      </button>
    </form>
  );
}
