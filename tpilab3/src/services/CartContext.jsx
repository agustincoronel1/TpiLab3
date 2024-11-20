import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const checkStock = (product) => {
    // Verificar si hay stock disponible
    console.log('Product stock: '+ product.stock);
    console.log('Cart: '+cart);
    if (cart){
      const cartItem = cart.find((item) => item.id === product.id);
      console.log(cartItem ? cartItem.quantity : 0);
      return product.stock <= 0 || (cartItem && product.stock <= cartItem.quantity);
    }
    
  }
  const checkCartStock = () => {
    cart.forEach((item) => {
      if (item.quantity > item.stock) {
        return item;
      }else{
        return null;
      }
    });
  }

  const addToCart = (product, size) => {
    if (checkStock(product)) {
      alert('No hay stock disponible para el talle seleccionado.');
      return;
    }
    setCart((prevCart) => {
      // Verificar si ya existe un producto con el mismo id y talle
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === size
      );
      alert('Producto agregado al carrito.');
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
          // Si queda solo uno lo elimina
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
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal, checkCartStock }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};