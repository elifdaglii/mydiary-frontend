import axios from 'axios';

const API_BASE_URL = 'http://localhost:5067/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/Auth/register', userData);
    return response.data;
  },
   
  login: async (credentials) => {
    const response = await api.post('/Auth/login', credentials);
    return response.data;
  },
};

// Entry API
export const entryAPI = {
  getAll: async () => {
    const response = await api.get('/Entry');
    return response.data;
  },
   
  getById: async (id) => {
    const response = await api.get(`/Entry/${id}`);
    return response.data;
  },
   
  create: async (entryData) => {
    const response = await api.post('/Entry', entryData);
    return response.data;
  },
   
  update: async (id, entryData) => {
    const response = await api.put(`/Entry/${id}`, entryData);
    return response.data;
  },
   
  delete: async (id) => {
    await api.delete(`/Entry/${id}`);
  },
};

// Auth helpers
export const authUtils = {
  setToken: (token) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),
  getToken: () => localStorage.getItem('token'),
  isAuthenticated: () => !!localStorage.getItem('token'),
};

export default api;