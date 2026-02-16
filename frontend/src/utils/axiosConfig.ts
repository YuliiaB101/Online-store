import axios from 'axios';

const rawApiUrl = process.env.REACT_APP_API_URL?.trim();
const normalizedApiUrl = rawApiUrl?.replace(/\/+$/, '');

export const API_URL = normalizedApiUrl
  ? (normalizedApiUrl.endsWith('/api') ? normalizedApiUrl : `${normalizedApiUrl}/api`)
  : 'http://localhost:5000/api';

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
