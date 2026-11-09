import styles from './Dashboard.module.css';

export default function Dashboard() {
  const stats = [
    { label: 'Total Orders', value: '128', icon: 'fa-solid fa-box-open' },
    { label: 'Total Sales', value: '450,000 Ks', icon: 'fa-solid fa-sack-dollar' },
    { label: 'Total Customers', value: '42', icon: 'fa-solid fa-users' },
    { label: 'Available Tables', value: '8', icon: 'fa-solid fa-chair' },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <h1>
          မင်္ဂလာပါ Admin <i className="fa-solid fa-hand"></i>
        </h1>
        <p>Cafe Management System မှ ကြိုဆိုပါသည်။ Admin Dashboard မှ စာရင်းများကို ဤနေရာတွင် စစ်ဆေးနိုင်ပါသည်။</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {stats.map((s, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className={s.icon}></i>
            </div>
            <div className={styles.statInfo}>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
