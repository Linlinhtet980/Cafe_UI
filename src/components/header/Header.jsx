import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h2 className={styles.pageTitle}>Admin Workspace</h2>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.searchBox}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>

        <button type="button" className={styles.themeToggle} onClick={toggleTheme}>
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
    </header>
  );
}
