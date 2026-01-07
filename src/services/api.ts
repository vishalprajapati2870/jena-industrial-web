import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important: Send cookies with requests
});

export const authService = {
  signup: async (userData: any) => {
    const response = await api.post('/signup', userData);
    return response.data;
  },
  login: async (userData: any) => {
    // Login now sets an HttpOnly cookie. No token is returned in the body.
    const response = await api.post('/signin', userData);
    return response.data;
  },
  logout: async () => {
    await api.post('/logout');
  },
  // New method to check if user is authenticated via cookie
  checkAuth: async () => {
    try {
      const response = await api.get('/me');
      return response.data; // Returns user object if authenticated
    } catch (error) {
      return null; // Not authenticated
    }
  }
};

export default api;
