import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import styles from './Users.module.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    address: ''
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    bio: '',
    address: ''
  });

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    api.get('/api/users')
      .then((response) => {
        if (isMounted) {
          setUsers(response.data.data || []);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Error fetching users:', error);
          toast.error(error.response?.data?.message || 'Users စာရင်း ရယူခြင်း မအောင်မြင်ပါ');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = users.filter((u) =>
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.warning('⚠️ အမည်၊ အီးမေးလ်နှင့် စကားဝှက် ထည့်သွင်းရန် လိုအပ်ပါသည်');
      return;
    }

    try {
      await api.post('/api/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      toast.success(`🎉 အသုံးပြုသူ "${formData.name}" ကို အောင်မြင်စွာ ထည့်သွင်းပြီးပါပြီ!`);
      setIsAddModalOpen(false);
      setFormData({ name: '', email: '', password: '', bio: '', address: '' });
      fetchUsers();
    } catch (error) {
      console.error('Create error:', error);
      toast.error(error.response?.data?.message || error.response?.data?.error || 'အသုံးပြုသူ ထည့်သွင်းခြင်း မအောင်မြင်ပါ');
    }
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      bio: user.profile?.bio || '',
      address: user.profile?.address || ''
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editFormData.name || !editFormData.email) {
      toast.warning('⚠️ အမည်နှင့် အီးမေးလ် ထည့်သွင်းရန် လိုအပ်ပါသည်');
      return;
    }

    setUsers(
      users.map((u) => {
        if (u.id === editingUser.id) {
          return {
            ...u,
            name: editFormData.name,
            email: editFormData.email,
            profile: {
              ...u.profile,
              bio: editFormData.bio,
              address: editFormData.address
            }
          };
        }
        return u;
      })
    );

    toast.success(`✏️ "${editFormData.name}" ၏ အချက်အလက်များကို ပြင်ဆင်ပြီးပါပြီ!`);
    setEditingUser(null);
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`"${name}" ကို စာရင်းမှ ဖျက်ပစ်ရန် သေချာပါသလား?`)) {
      return;
    }

    try {
      await api.delete(`/api/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
      toast.success(`🗑️ "${name}" ကို စာရင်းမှ ဖျက်ပစ်ပြီးပါပြီ`);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'အသုံးပြုသူ ဖျက်ပစ်ခြင်း မအောင်မြင်ပါ');
    }
  };

  return (
    <div className={styles.usersPage}>
      <div className={styles.pageHeader}>
        <div className={styles.titleGroup}>
          <h1>Users & Staff Management</h1>
          <p>Cafe Database မှ အသုံးပြုသူများနှင့် ဝန်ထမ်းအချက်အလက်များ</p>
        </div>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setIsAddModalOpen(true)}
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
                  <td colSpan="6" style={{ textAlign: 'center', opacity: 0.7, padding: '2.5rem' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> ဒေတာများ ရယူနေပါသည်...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', opacity: 0.6, padding: '2rem' }}>
                    အသုံးပြုသူ မတွေ့ရှိပါ
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar}>{(u.name || 'U').charAt(0).toUpperCase()}</div>
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
                          onClick={() => setSelectedUser(u)}
                          title="View Details"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button
                          type="button"
                          className={styles.editBtn}
                          onClick={() => handleOpenEdit(u)}
                          title="Edit User"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteUser(u.id, u.name)}
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

      {isAddModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsAddModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Add New User</h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsAddModalOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="user@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Bio / Role</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Barista"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Address</label>
                <textarea
                  rows="2"
                  placeholder="Yangon, Myanmar..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedUser(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>User Details</h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setSelectedUser(null)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Name</span>
                <span className={styles.detailValue}>{selectedUser.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>{selectedUser.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Bio / Role</span>
                <span className={styles.detailValue}>{selectedUser.profile?.bio || 'Not specified'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Address</span>
                <span className={styles.detailValue}>{selectedUser.profile?.address || 'Not specified'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Date Joined</span>
                <span className={styles.detailValue}>
                  {selectedUser.createdAt ? selectedUser.createdAt.split('T')[0] : '-'}
                </span>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.saveBtn}
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {editingUser && (
        <div className={styles.modalBackdrop} onClick={() => setEditingUser(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Edit User Information</h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setEditingUser(null)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Bio / Role</label>
                <input
                  type="text"
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Address</label>
                <textarea
                  rows="2"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                />
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Update Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
