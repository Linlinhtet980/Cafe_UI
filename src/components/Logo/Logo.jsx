import styles from './Logo.module.css';

export default function Logo({ text = 'Cafe House', size = 'small', className = '' }) {
  return (
    <div className={`${styles.logoContainer} ${styles[size]} ${className}`}>
      <div className={styles.iconWrapper}>
        {/* Steam SVG Waves with continuous rising animation */}
        <svg className={styles.steamSvg} viewBox="0 0 24 16">
          <path className={`${styles.steamPath} ${styles.steam1}`} d="M6 14 Q 4 8, 8 2" />
          <path className={`${styles.steamPath} ${styles.steam2}`} d="M12 15 Q 15 8, 11 1" />
          <path className={`${styles.steamPath} ${styles.steam3}`} d="M18 14 Q 16 8, 20 2" />
         </svg>

        {/* Coffee Cup Icon */}
        <i className={`fa-solid fa-mug-saucer ${styles.cupIcon}`}></i>
      </div>

      {text && <span className={styles.logoText}>{text}</span>}
    </div>
  );
}

