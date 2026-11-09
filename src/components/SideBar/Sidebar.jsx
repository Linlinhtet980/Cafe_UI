import { NavLink, Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Logout from '../Logout/Logout';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: 'fa-solid fa-chart-pie', end: true },
    { path: '/admin/users', label: 'Users & Staff', icon: 'fa-solid fa-users', end: false },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Brand - Perfectly aligned with Header, animated steaming Logo */}
      <Link to="/admin" className={styles.brand}>
        <Logo text="Cafe Admin" size="small" />
      </Link>

      {/* Scrollable Sidebar Body (Nav links & Profile Footer) */}
      <div className={styles.sidebarBody}>
        <div className={styles.navSection}>
          <span className={styles.navLabel}>Menu</span>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <i className={`${item.icon} ${styles.navIcon}`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Sidebar Footer with Admin Profile & Logout */}
        <div className={styles.sidebarFooter}>
          <div className={styles.adminProfile}>
            <div className={styles.adminInfo}>
              <div className={styles.adminAvatar}>A</div>
              <div className={styles.adminText}>
                <span className={styles.adminName}>Admin User</span>
                <span className={styles.adminRole}>Manager</span>
              </div>
            </div>
            <Logout />
          </div>
        </div>
      </div>
    </aside>
  );
}
