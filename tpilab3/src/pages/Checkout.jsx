import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Alert } from 'react-bootstrap';  
import { CheckCircle } from 'react-bootstrap-icons';  
const Checkout = () => {
  const [showSuccess, setShowSuccess] = useState(false);  

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowSuccess(true);
  };

  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="container flex-grow-1 py-5">
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Dirección</label>
            <input type="text" className="form-control" id="address" required />
          </div>
          <div className="mb-3">
            <label htmlFor="payment" className="form-label">Método de Pago</label>
            <select className="form-select" id="payment" required>
              <option value="">Selecciona un método de pago</option>
              <option value="credit-card">Tarjeta de Crédito</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <button type="submit" className="btn btn-dark">Pagar</button>
        </form>

        {showSuccess && (
          <Alert variant="success" className="mt-4">
            <div className="d-flex align-items-center">
              <CheckCircle className="me-2" size={24} color="green" />
              <span>¡La compra se realizó con éxito!</span>
            </div>
          </Alert>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
