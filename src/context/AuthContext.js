import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
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
        // Save the token and set auth state
        localStorage.setItem('authToken', data.token);
        setIsAuthenticated(true);
        console.log("Login successfully completed", data);
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

  const logout = () => {
    // Clear auth token and update state
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
