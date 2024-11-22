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

  //Usamos una funcion register para registrar el usuario en la api
  const register = async (userData) => {
    try {
      // Hacemos una funcion fetch para verificar si el correo ya esta en uso
      const checkResponse = await fetch(`https://fake-api-nodejs-m072.onrender.com/users?email=${userData.email}`);
      if (checkResponse.ok) {
        const existingUsers = await checkResponse.json();
        if (existingUsers.length > 0) {
          alert('El correo electrónico ya está en uso.');
          return;
        }
      } else {
        throw new Error('Error al verificar el correo');
      }
      // Si el correo no esta en uso, registramos el usuario
      const response = await fetch('https://fake-api-nodejs-m072.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const newUser = await response.json();
        alert('Usuario registrado correctamentte')
        return newUser;
      } else {
        throw new Error('Fallo al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

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