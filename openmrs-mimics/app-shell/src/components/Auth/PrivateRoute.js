import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Login';
import { isSessionValid } from '../../utils/auth';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  
  // Additional check for session validity
  const isSessionValidCheck = isSessionValid();
  
  if (!isLoggedIn || !isSessionValidCheck) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default PrivateRoute;