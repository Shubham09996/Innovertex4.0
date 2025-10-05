import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        // In a real app, you'd verify the token and fetch user data
        // For now, let's assume a successful login or a valid token implies a user
        try {
          const userData = await api.getProfile(storedToken);
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user profile with stored token:", error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      // Fetch user profile after login
      const userData = await api.getProfile(data.token);
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
