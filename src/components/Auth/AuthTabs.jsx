import Logo from '../Logo/Logo';
import styles from './Auth.module.css';

export default function AuthTabs({ isLogin, onSwitchTab }) {
  return (
    <>
      <div className={styles.authBrand}>
        <Logo text="Cafe House" size="large" />
        <p>{isLogin ? 'သင့်အကောင့်သို့ ဝင်ရောက်ပါ' : 'အကောင့်အသစ် ဖွင့်လှစ်ပါ'}</p>
      </div>

      <div className={styles.authTabs}>
        <button
          type="button"
          className={`${styles.tabBtn} ${isLogin ? styles.active : ''}`}
          onClick={() => onSwitchTab(true)}
        >
          Login
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${!isLogin ? styles.active : ''}`}
          onClick={() => onSwitchTab(false)}
        >
          Register
        </button>
      </div>
    </>
  );
}
