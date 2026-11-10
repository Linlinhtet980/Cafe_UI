import api from './api';

export const userService = {
  getAll: () => api.get('/api/users'),
  getById: (id) => api.get(`/api/users/${id}`),
  create: (userData) => api.post('/api/users', {
    name: userData.name,
    email: userData.email,
    password: userData.password
  }),
  delete: (id) => api.delete(`/api/users/${id}`)
};

export default userService;
