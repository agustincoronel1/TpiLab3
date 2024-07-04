import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useCart } from '../services/CartContext'; // Asegúrate de importar el hook useCart

const Cart = () => {
  const { cart, removeFromCart, getTotal } = useCart(); // Usa el contexto para obtener los datos del carrito y las funciones
  
  // Obtener el total del carrito
  const total = getTotal();

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
            {cart.length > 0 ? (
              <ul className="list-group">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5>{item.name}</h5>
                      <p>Precio: ${item.price.toFixed(2)}</p>
                      <p>Talle: {item.size}</p>
                    </div>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
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