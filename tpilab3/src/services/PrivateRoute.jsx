import React from 'react';
import { Route, Navigate} from 'react-router-dom';
import { useAuth } from './AuthenticationContext';

const PrivateRoute = ({ component: Component, }) => {
  const { isAuthenticated } = useAuth();
    console.log("Esta autenticado?:" + isAuthenticated)
  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;