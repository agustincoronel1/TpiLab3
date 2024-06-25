import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { Carousel } from 'react-bootstrap';

const products = [
  { id: 1, name: 'Producto 1', price: 29.99, image: 'https://via.placeholder.com/300', sizes: ['S', 'M', 'L'] },
  { id: 2, name: 'Producto 2', price: 39.99, image: 'https://via.placeholder.com/300', sizes: ['S', 'M', 'L'] },
  { id: 3, name: 'Producto 3', price: 49.99, image: 'https://via.placeholder.com/300', sizes: ['S', 'M', 'L'] },
  { id: 4, name: 'Producto 4', price: 29.99, image: 'https://via.placeholder.com/300', sizes: ['S', 'M', 'L'] },
  { id: 5, name: 'Producto 5', price: 39.99, image: 'https://via.placeholder.com/300', sizes: ['S', 'M', 'L'] },
  { id: 6, name: 'Producto 6', price: 49.99, image: 'https://via.placeholder.com/300', sizes: ['S', 'M', 'L'] },
  { id: 7, name: 'Producto 7', price: 59.99, image: 'https://via.placeholder.com/300', sizes: ['S', 'M', 'L'] },
  { id: 8, name: 'Producto 8', price: 69.99, image: 'https://via.placeholder.com/300', sizes: ['S', 'M', 'L'] },
 
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  const carouselItems = [];

  for (let i = 0; i < products.length; i += 4) {
    const items = products.slice(i, i + 4).map(product => (
      <div className="col-md-3 d-flex justify-content-center" key={product.id}>
        <Card product={product} />
      </div>
    ));
    carouselItems.push(
      <Carousel.Item key={i}>
        <div className="row justify-content-center">
          {items}
        </div>
      </Carousel.Item>
    );
  }

  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="container flex-grow-1 py-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1>{product.name}</h1>
            <h2>${product.price}</h2>
            <div className="my-3">
              <h5>Talles disponibles:</h5>
              <div>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className="btn btn-outline-secondary me-2 mb-2"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn btn-dark mt-3">Agregar al carrito</button>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-center mb-4">TAMBIÉN TE PUEDE INTERESAR</h2>
          <Carousel indicators={false} interval={4000} pause={false}>
            {carouselItems}
          </Carousel>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;