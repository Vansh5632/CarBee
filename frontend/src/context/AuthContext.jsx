import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // Set the token in the request headers
      axios.defaults.headers.common['x-auth-token'] = token;
      
    }
  }, [token]);

  const register = async (formData) => {
    try {
      // Send a POST request to register a new user
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      // Store the token in local storage
      localStorage.setItem('token', res.data.token);
      // Set the token state
      setToken(res.data.token);
      // Optionally fetch user data and set user state
    } catch (err) {
      console.error('Registration error:', err.response.data);
      // Handle errors
    }
  };

  const login = async (formData) => {
    try {
      // Send a POST request to login
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      // Store the token in local storage
      localStorage.setItem('token', res.data.token);
      // Set the token state
      setToken(res.data.token);
      // Optionally fetch user data and set user state
    } catch (err) {
      console.error('Login error:', err.response.data);
      // Handle errors
    }
  };

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Clear the token state
    setToken(null);
    // Clear the user state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
