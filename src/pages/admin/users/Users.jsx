import { useState } from 'react';
import { toast } from 'react-toastify';
import useUsers from '../../../hooks/useUsers';
import UserHeader from '../../../components/User/UserHeader';
import UserTable from '../../../components/User/UserTable';
import UserModals from '../../../components/User/UserModals';
import styles from './Users.module.css';

export default function Users() {
  const {
    loading,
    searchTerm,
    setSearchTerm,
    filteredUsers,
    createUser,
    updateUser,
    deleteUser
  } = useUsers();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    address: '',
    profileImage: null
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    bio: '',
    address: '',
    profileImage: null
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.warning('⚠️ အမည်၊ အီးမေးလ်နှင့် စကားဝှက် ထည့်သွင်းရန် လိုအပ်ပါသည်');
      return;
    }
    const success = await createUser(formData);
    if (success) {
      setIsAddModalOpen(false);
      setFormData({ name: '', email: '', password: '', bio: '', address: '', profileImage: null });
    }
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      bio: user.profile?.bio || '',
      address: user.profile?.address || '',
      profileImage: user.profileImage || null
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editFormData.name || !editFormData.email) {
      toast.warning('⚠️ အမည်နှင့် အီးမေးလ် ထည့်သွင်းရန် လိုအပ်ပါသည်');
      return;
    }
    updateUser(editingUser.id, editFormData);
    setEditingUser(null);
  };

  return (
    <div className={styles.usersPage}>
      <UserHeader
        onOpenAdd={() => setIsAddModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <UserTable
        users={filteredUsers}
        loading={loading}
        onView={setSelectedUser}
        onEdit={handleOpenEdit}
        onDelete={deleteUser}
      />

      <UserModals
        isAddModalOpen={isAddModalOpen}
        onCloseAdd={() => setIsAddModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onAddSubmit={handleAddSubmit}
        selectedUser={selectedUser}
        onCloseDetail={() => setSelectedUser(null)}
        editingUser={editingUser}
        onCloseEdit={() => setEditingUser(null)}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        onEditSubmit={handleEditSubmit}
      />
    </div>
  );
}
