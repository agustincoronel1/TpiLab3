import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCart } from './CartContext'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { clearCart } = useCart(); // obtenemos la función clearCart del CartContext
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedValue = localStorage.getItem('isAuthenticated');
    return storedValue === 'true';
  });
  
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'guest';
  });

  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    clearCart(); 
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    if (storedAuth !== null) {
      setIsAuthenticated(storedAuth === 'true');
      setUserRole(storedRole || 'guest');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};