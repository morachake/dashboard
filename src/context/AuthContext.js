import config from 'config';
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
    Boolean(localStorage.getItem('accessToken'))
  );

  const login = async (username, password) => {
    try {
      const response = await fetch(`${config.backendURL}/login`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
     
      if (response.ok) {
        const data = await response.json();        
        setUser(data.user);
        setIsAuthenticated(true);
        const accessToken = data.access_token;
    

        localStorage.setItem('user', JSON.stringify(data.user)); 
        localStorage.setItem('accessToken', accessToken);
        if (data.user.user_type === 'admin') {
          navigate('/admin/index');
        } else if (data.user.user_type === 'cec') {
          navigate('/executive');
        } else if (data.user.user_type === 'county_secretary') {
          navigate('/cabinet');
        } else if (data.user.user_type === 'director' || data.user.user_type === 'chief_officer') {
          navigate('/ministry')
        }  else {
          navigate('/login');
        }
        
      } else {
      
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  const resetPassword = async (username, oldPassword, newPassword) => {
    try {
      const response = await fetch(`${config.backendURL}/reset_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, old_password: oldPassword, new_password: newPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user'); // Clear the user from local storage
    setUser(null); // Reset the user state
    setIsAuthenticated(false);
    navigate('/auth/login'); // Navigate back to the login page
  };
  

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, logout,resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
