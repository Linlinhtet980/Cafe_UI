import styles from './User.module.css';

export default function UserHeader({ onOpenAdd, searchTerm, onSearchChange }) {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className={styles.titleGroup}>
          <h1>Users & Staff Management</h1>
          <p>Cafe Database မှ အသုံးပြုသူများနှင့် ဝန်ထမ်းအချက်အလက်များ</p>
        </div>
        <button
          type="button"
          className={styles.addBtn}
          onClick={onOpenAdd}
        >
          <i className="fa-solid fa-user-plus"></i> Add New User
        </button>
      </div>

      <div className={styles.searchBar}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </>
  );
}
