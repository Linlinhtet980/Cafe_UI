import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ message = 'ဒေတာများ ရယူနေပါသည်...' }) {
  return (
    <div className={styles.spinnerWrapper}>
      <i className={`fa-solid fa-spinner ${styles.spinner}`}></i>
      {message && <span className={styles.spinnerText}>{message}</span>}
    </div>
  );
}
