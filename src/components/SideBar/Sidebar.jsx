import { NavLink, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Logo from '../Logo/Logo';
import Logout from '../Logout/Logout';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { user } = useAuth();
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: 'fa-solid fa-chart-pie', end: true },
    { path: '/admin/users', label: 'Users & Staff', icon: 'fa-solid fa-users', end: false },
  ];

  return (
    <aside className={styles.sidebar}>
      <Link to="/admin" className={styles.brand}>
        <Logo text="Cafe Admin" size="small" />
      </Link>

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

        <div className={styles.sidebarFooter}>
          <div className={styles.adminProfile}>
            <div className={styles.adminInfo}>
              <div className={styles.adminAvatar}>
                {(user?.name || 'A').charAt(0).toUpperCase()}
              </div>
              <div className={styles.adminText}>
                <span className={styles.adminName}>{user?.name || 'Admin User'}</span>
                <span className={styles.adminRole}>{user?.email || 'Manager'}</span>
              </div>
            </div>
            <Logout />
          </div>
        </div>
      </div>
    </aside>
  );
}
