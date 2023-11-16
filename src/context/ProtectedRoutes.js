import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
