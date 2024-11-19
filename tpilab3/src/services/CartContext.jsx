import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size) => {
    setCart((prevCart) => {
      // Verificar si ya existe un producto con el mismo id y talle
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === size
      );
  
      if (existingProduct) {
        // Incrementar la cantidad si ya existe
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Agregar como nuevo producto si no existe
        return [...prevCart, { ...product, selectedSize: size, quantity: 1 }];
      }
    });
  };
  

  const removeFromCart = (deletedProduct) => {
    setCart((prevCart) => 
      prevCart.reduce((acc, item) => {
        if (item.id === deletedProduct.id && item.selectedSize === deletedProduct.selectedSize) {
          if (item.quantity > 1) {
            // Reducir la cantidad si hay más de 1
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
          // Si queda solo uno, lo elimina
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };
  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};