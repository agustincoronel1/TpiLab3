import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Cart = () => {
  const cartItems = [
    { id: 1, name: 'Producto 1', price: 29.99, size: 'M' },
    { id: 2, name: 'Producto 2', price: 39.99, size: 'S' },
    { id: 3, name: 'Producto 3', price: 49.99, size: 'L' },
  ];

  // Calcular el total del carrito
  const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div>
      <NavBar />
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/" className="btn btn-outline-secondary">
            Volver atrás
          </Link>
          <h1>Mi Carrito</h1>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h2>Listado de Productos</h2>
            <ul className="list-group">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p>Precio: ${item.price.toFixed(2)}</p>
                    <p>Talle: {item.size}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <h2>Resumen de la Compra</h2>
            <div className="border p-3">
              <h4>Total: ${total}</h4>
              <button className="btn btn-dark w-100">Proceder al Pago</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

