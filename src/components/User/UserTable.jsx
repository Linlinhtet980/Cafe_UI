import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import styles from './User.module.css';

export default function UserTable({ users, loading, onView, onEdit, onDelete }) {
  return (
    <div className={styles.tableCard}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Bio / Role</th>
              <th>Address</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
                  <LoadingSpinner />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', opacity: 0.6, padding: '2rem' }}>
                  အသုံးပြုသူ မတွေ့ရှိပါ
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>#{u.id}</td>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.avatar}>
                        {u.profileImage ? (
                          <img src={u.profileImage} alt={u.name} className={styles.avatarImg} />
                        ) : (
                          (u.name || 'U').charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className={styles.userName}>{u.name}</div>
                        <div className={styles.userEmail}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.bioTag}>{u.profile?.bio || '-'}</span>
                  </td>
                  <td>
                    <span className={styles.addressText}>{u.profile?.address || '-'}</span>
                  </td>
                  <td>{u.createdAt ? u.createdAt.split('T')[0] : '-'}</td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button
                        type="button"
                        className={styles.viewBtn}
                        onClick={() => onView(u)}
                        title="View Details"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button
                        type="button"
                        className={styles.editBtn}
                        onClick={() => onEdit(u)}
                        title="Edit User"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => onDelete(u.id, u.name)}
                        title="Delete User"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
