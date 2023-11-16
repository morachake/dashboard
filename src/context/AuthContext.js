import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('authToken'))
  );

  const login = async (username, password) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();        
        setUser(data.user);
        setIsAuthenticated(true);
        console.log("Login successfully completed", data);
        localStorage.setItem('user', JSON.stringify(data.user)); 
        localStorage.setItem('authToken', data.token);
        // Redirect or perform additional actions
        navigate('/admin/index')
      } else {
        console.log("Login failed");
        // Handle login failure
        const errorData = await response.json();
        console.log("error data is", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const register = async (username,email,password) => {
    try {
      
    } catch (error) {
      
    }
  };
  const logout = () => {
    // Clear auth token and update state
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
