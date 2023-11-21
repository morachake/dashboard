import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Make sure the path is correct

const ProtectedRoute = ({ children, allowedUserTypes }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedUserTypes.includes(user.user_type)) {
    // Redirect to an unauthorized page if the user doesn't have the correct role
    return <Navigate to="/unauthorized" replace />;
  }

  // If the user is authenticated and has the correct role, render the children
  return children;
};

export default ProtectedRoute;
