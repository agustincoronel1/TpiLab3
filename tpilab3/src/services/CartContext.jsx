import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const checkStock = (product, size) => {
    // Encontrar el stock correspondiente al talle seleccionado
    const selectedSize = product.sizes.find((s) => s.size === size);
    console.log(product)
    console.log(size)

    if (!selectedSize) {
      console.error(`El tamaño ${size} no está disponible para este producto.`);
      return true; // Considerar como sin stock
    }

    const cartItem = cart.find(
      (item) => item.id === product.id && item.selectedSize === size
    );

    // Verificar si el stock disponible es suficiente
    return (
      selectedSize.stock <= 0 ||
      (cartItem && selectedSize.stock <= cartItem.quantity)
    );
  };

  const checkCartStock = () => {
    return cart.filter((item) => {
      const product = item;
      if (!product) return false;
      const productSize = product.sizes.find((s) => s.size === item.selectedSize);
      return productSize && item.quantity > productSize.stock;
    });
  };

  const addToCart = (product, size) => {
    if (checkStock(product, size)) {
      alert('No hay stock disponible para el talle seleccionado.');
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === size
      );
      console.log(existingProduct)
      if (existingProduct) {
        // Incrementar la cantidad si ya existe
        alert('Producto agregado al carrito.');
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Agregar como nuevo producto si no existe
        alert('Producto agregado al carrito.');
        return [
          ...prevCart,
          { ...product, selectedSize: size, quantity: 1}
        ];
      }
    });
  };

  const removeFromCart = (deletedProduct) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, item) => {
        if (
          item.id === deletedProduct.id &&
          item.selectedSize === deletedProduct.selectedSize
        ) {
          if (item.quantity > 1) {
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
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        checkCartStock
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
