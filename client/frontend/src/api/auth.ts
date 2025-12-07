import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend

export const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};
