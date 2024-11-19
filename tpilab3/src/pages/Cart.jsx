import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useCart } from '../services/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthenticationContext';

const Cart = () => {
  const { cart, getTotal, removeFromCart } = useCart();
  const { userRole } = useAuth();

  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="container flex-grow-1 py-5">
        <button className="btn btn-outline-primary mb-3" onClick={() => window.history.back()}>
          Volver atrás
        </button>
        <h1>Carrito de Compras</h1>
        {cart.length > 0 ? (
          <div className="row">
            <div className="col-md-8">
              {cart.map((item, index) => (
                <div key={index} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Precio: ${item.price}</p>
                        <p className="card-text">Talle: {item.selectedSize}</p>
                        <p className="card-text">Cantidad: {item.quantity}</p> {/* Mostrar cantidad */}
                        <button className="btn btn-danger" onClick={() => removeFromCart(item)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              {userRole !== 'admin' ? (
                <>
                  <h3>Resumen de Compra</h3>
                  <p>Total: ${getTotal()}</p>
                  <Link to="/checkout" className="btn btn-dark">Finalizar Compra</Link>
                </>
              ) : (
                <p>No puedes realizar compras como administrador.</p>
              )}
            </div>
          </div>
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
