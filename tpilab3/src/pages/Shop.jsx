import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';

// Datos simulados de productos (puedes reemplazar esto con datos reales de una API)

const products = [
  { id: 1, name: 'Producto 1', price: 29.99, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Producto 2', price: 39.99, image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Producto 3', price: 49.99, image: 'https://via.placeholder.com/300' },
];

const Shop = () => {
  return (
    <div className="container">
      <NavBar/>
      <h1>Shop</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <Card product={product} />
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Shop;