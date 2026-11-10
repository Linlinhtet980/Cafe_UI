import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import userService from '../services/userService';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await userService.getAll();
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    userService.getAll()
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

  const createUser = async (userData) => {
    try {
      await userService.create(userData);
      toast.success(`🎉 အသုံးပြုသူ "${userData.name}" ကို အောင်မြင်စွာ ထည့်သွင်းပြီးပါပြီ!`);
      await fetchUsers();
      return true;
    } catch (error) {
      console.error('Create error:', error);
      toast.error(error.response?.data?.message || error.response?.data?.error || 'အသုံးပြုသူ ထည့်သွင်းခြင်း မအောင်မြင်ပါ');
      return false;
    }
  };

  const updateUser = (id, editData) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            name: editData.name,
            email: editData.email,
            profileImage: editData.profileImage !== undefined ? editData.profileImage : u.profileImage,
            profile: {
              ...u.profile,
              bio: editData.bio,
              address: editData.address
            }
          };
        }
        return u;
      })
    );
    toast.success(`✏️ "${editData.name}" ၏ အချက်အလက်များကို ပြင်ဆင်ပြီးပါပြီ!`);
  };

  const deleteUser = async (id, name) => {
    if (!window.confirm(`"${name}" ကို စာရင်းမှ ဖျက်ပစ်ရန် သေချာပါသလား?`)) {
      return;
    }

    try {
      await userService.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success(`🗑️ "${name}" ကို စာရင်းမှ ဖျက်ပစ်ပြီးပါပြီ`);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'အသုံးပြုသူ ဖျက်ပစ်ခြင်း မအောင်မြင်ပါ');
    }
  };

  return {
    users,
    loading,
    searchTerm,
    setSearchTerm,
    filteredUsers,
    createUser,
    updateUser,
    deleteUser,
    fetchUsers
  };
}
