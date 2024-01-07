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
       return { success: true }; 
      } else {
      
        const errorData = await response.json();
       return {error : errorData.message}
      }
    } catch (error) {
      return {error: error.message};
    }
  };

  const accessToken = localStorage.getItem('accessToken')
  const resetPassword = async ( oldPassword, newPassword) => {
    try {
      const response = await fetch(`${config.backendURL}/reset_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${accessToken}`
        },
        body: JSON.stringify({old_password: oldPassword, new_password: newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        return {success : false, message : data.error || 'An error occurred'}
      } else {
        return {success: true, message : 'Password reset Successful'}
      }
    } catch (error) {
     return {success : false, message : error.message || 'Netwrok Error .'}
    }
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');
    setUser(null); // Reset the user state
    setIsAuthenticated(false);
    navigate('/login'); // Navigate back to the login page
  };
  

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, logout,resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
