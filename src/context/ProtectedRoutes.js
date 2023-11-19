import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary



const ProtectedRoute = ({ children,userType }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/auth/login" replace />;
  }

  // Check if the user type from the user matches the required userType for this route
  if (userType && user.user_type !== userType) {
    // User type is not authorized for this route, redirect accordingly
    return <Navigate to="/auth/unauthorized" replace />;
  }

  // User is authenticated and authorized, render the children
  return children;
};

export default ProtectedRoute;
