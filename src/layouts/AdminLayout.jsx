import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar/Sidebar';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />

      <div className={styles.mainWrapper}>
        <Header />

        <main className={styles.contentArea}>
          <div className={styles.contentInner}>
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
