import styles from './User.module.css';

export default function UserModals({
  isAddModalOpen,
  onCloseAdd,
  formData,
  setFormData,
  onAddSubmit,
  selectedUser,
  onCloseDetail,
  editingUser,
  onCloseEdit,
  editFormData,
  setEditFormData,
  onEditSubmit
}) {
  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditFormData((prev) => ({ ...prev, profileImage: reader.result }));
        } else {
          setFormData((prev) => ({ ...prev, profileImage: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isAddModalOpen && (
        <div className={styles.modalBackdrop} onClick={onCloseAdd}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Add New User</h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onCloseAdd}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={onAddSubmit}>
              <div className={styles.avatarUploadGroup}>
                <label htmlFor="addAvatarInput" className={styles.avatarPreviewWrapper}>
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Avatar" className={styles.avatarPreviewImg} />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      <i className="fa-solid fa-camera"></i>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="addAvatarInput"
                  accept="image/*"
                  className={styles.fileInputHidden}
                  onChange={(e) => handleFileChange(e, false)}
                />
                <label htmlFor="addAvatarInput" className={styles.avatarUploadBtn}>
                  <i className="fa-solid fa-upload"></i> {formData.profileImage ? 'Change Photo' : 'Upload Photo'}
                </label>
              </div>

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
                  onClick={onCloseAdd}
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
        <div className={styles.modalBackdrop} onClick={onCloseDetail}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>User Details</h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onCloseDetail}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className={styles.avatarUploadGroup}>
              <div className={styles.avatarPreviewWrapper} style={{ cursor: 'default' }}>
                {selectedUser.profileImage ? (
                  <img src={selectedUser.profileImage} alt={selectedUser.name} className={styles.avatarPreviewImg} />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {(selectedUser.name || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
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
                onClick={onCloseDetail}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {editingUser && (
        <div className={styles.modalBackdrop} onClick={onCloseEdit}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Edit User Information</h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onCloseEdit}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={onEditSubmit}>
              <div className={styles.avatarUploadGroup}>
                <label htmlFor="editAvatarInput" className={styles.avatarPreviewWrapper}>
                  {editFormData.profileImage ? (
                    <img src={editFormData.profileImage} alt="Avatar" className={styles.avatarPreviewImg} />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      <i className="fa-solid fa-camera"></i>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="editAvatarInput"
                  accept="image/*"
                  className={styles.fileInputHidden}
                  onChange={(e) => handleFileChange(e, true)}
                />
                <label htmlFor="editAvatarInput" className={styles.avatarUploadBtn}>
                  <i className="fa-solid fa-upload"></i> {editFormData.profileImage ? 'Change Photo' : 'Upload Photo'}
                </label>
              </div>

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
                  onClick={onCloseEdit}
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
    </>
  );
}
