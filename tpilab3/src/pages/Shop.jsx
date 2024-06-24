import React from 'react';
import { ArrowDown, Filter } from 'react-bootstrap-icons';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';

const products = [
  { id: 1, name: 'Producto 1', price: 29.99, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Producto 2', price: 39.99, image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Producto 3', price: 49.99, image: 'https://via.placeholder.com/300' },
  { id: 4, name: 'Producto 4', price: 29.99, image: 'https://via.placeholder.com/300' },
  { id: 5, name: 'Producto 5', price: 39.99, image: 'https://via.placeholder.com/300' },
  { id: 6, name: 'Producto 6', price: 49.99, image: 'https://via.placeholder.com/300' },
];

const Shop = () => {
  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1">
        <div className="container py-5">
          <h1 className="mb-4">Productos</h1>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <button className="btn btn-brown me-2">
                <ArrowDown className="me-2" /> Ordenar
              </button>
              <button className="btn btn-brown">
                <Filter className="me-2" /> Filtrar
              </button>
            </div>
          </div>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
