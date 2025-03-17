import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;
};

export const getProblems = async () => {
  const response = await api.get('/problems');
  return response.data;
};

export const getProblem = async (id) => {
  const response = await api.get(`/problems/${id}`);
  return response.data;
};

export const submitSolution = async (problemId, code, language) => {
  const response = await api.post(`/problems/${problemId}/submit`, {
    code,
    language
  });
  return response.data;
}; 