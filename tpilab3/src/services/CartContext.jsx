import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size) => {
    const productWithSize = { ...product, selectedSize: size };
    setCart(prevCart => [...prevCart, productWithSize]);
  };

  const removeFromCart = (deletedProduct) => {
    console.log(deletedProduct)
    console.log(cart)
    setCart(prevCart => prevCart.filter(product => product.id !== deletedProduct.id || product.selectedSize !== deletedProduct.selectedSize));
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