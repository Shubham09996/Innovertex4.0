const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// console.log('Frontend API URL:', API_URL); // Debugging

const api = {
  signup: async (username, email, password, role) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, role }),
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  // Add other API calls here
};

export default api;
