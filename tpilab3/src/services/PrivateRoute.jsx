import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthenticationContext';

const PrivateRoute = ({ element, roles = [] }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles.length && !roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;