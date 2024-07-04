import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
    setUserRole('guest');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userRole');
  };

  //agrego el register 
  const register = async (userData) => {
    try {
      const response = await fetch('https://fake-api-nodejs-m072.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();
        return newUser;
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
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
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};