import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const res = await axios.post('http://localhost:4000/api/auth/refresh-token', {
            refreshToken
          });
          const newAccessToken = res.data?.data?.accessToken || res.data?.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.clear();
          window.location.href = '/auth';
        }
      } else {
        localStorage.clear();
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
