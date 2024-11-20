import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Alert } from 'react-bootstrap';  
import { CheckCircle } from 'react-bootstrap-icons';  
import { useCart } from '../services/CartContext';

const Checkout = () => {
  const { clearCart, checkCartStock } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    dni: '',
    address: '',
    payment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const item = checkCartStock()
    if(item){
      alert('No hay stock disponible del producto '+ item.name + 'solo quedan ' + item.stock + ' unidades');
      return
    }
    setShowSuccess(true);
    clearCart();
  };

  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="container flex-grow-1 py-5">
        <h1>Checkout</h1>
        {!showSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">Apellido</label>
              <input type="text" className="form-control" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Teléfono</label>
              <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">DNI</label>
              <input type="text" className="form-control" id="dni" name="dni" value={formData.dni} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección</label>
              <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="payment" className="form-label">Método de Pago</label>
              <select className="form-select" id="payment" name="payment" value={formData.payment} onChange={(e) => { handleChange(e); setPaymentMethod(e.target.value); }} required>
                <option value="">Selecciona un método de pago</option>
                <option value="mercadopago">MercadoPago</option>
                <option value="transferencia">Transferencia Bancaria</option>
              </select>
            </div>
            <button type="submit" className="btn btn-dark">Pagar</button>
          </form>
        )}

        {showSuccess && paymentMethod === 'mercadopago' && (
          <Alert variant="success" className="mt-4">
            <div className="d-flex align-items-center">
              <CheckCircle className="me-2" size={24} color="green" />
              <span className="h4">¡La compra se realizó con éxito! El enlace de pago de MercadoPago se enviará a tu correo electrónico.</span>
            </div>
          </Alert>
        )}

        {showSuccess && paymentMethod === 'transferencia' && (
          <Alert variant="success" className="mt-4">
            <div>
              <div className="d-flex align-items-center">
                <CheckCircle className="me-2" size={24} color="green" />
                <span className="h4">¡La compra se realizó con éxito!</span>
              </div>
              <div className="mt-3">
                <p>Realiza la transferencia bancaria a la siguiente cuenta:</p>
                <ul>
                  <li><strong>Nombre:</strong> Juan Pérez</li>
                  <li><strong>DNI:</strong> 12345678</li>
                  <li><strong>Alias:</strong> cuenta.juanperez</li>
                  <li><strong>CBU:</strong> 1234567890123456789012</li>
                  <li><strong>Número de Cuenta:</strong> 12345678</li>
                  <li><strong>Banco:</strong> Banco Ficticio</li>
                </ul>
                <p>Se enviará un mensaje y correo electrónico cuando se reciba la transferencia.</p>
              </div>
            </div>
          </Alert>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
