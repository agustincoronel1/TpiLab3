import React from 'react';
import { Carousel } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card'; 
import portada from '../assets/portada.jpg'; 

const products = [
  { id: 1, name: 'Producto 1', price: 29.99, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Producto 2', price: 39.99, image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Producto 3', price: 49.99, image: 'https://via.placeholder.com/300' },
  { id: 4, name: 'Producto 4', price: 29.99, image: 'https://via.placeholder.com/300' },
  { id: 5, name: 'Producto 5', price: 39.99, image: 'https://via.placeholder.com/300' },
  { id: 6, name: 'Producto 6', price: 49.99, image: 'https://via.placeholder.com/300' },
  { id: 7, name: 'Producto 7', price: 29.99, image: 'https://via.placeholder.com/300' },
  { id: 8, name: 'Producto 8', price: 39.99, image: 'https://via.placeholder.com/300' },
//   { id: 9, name: 'Producto 9', price: 49.99, image: 'https://via.placeholder.com/300' },
//   { id: 10, name: 'Producto 10', price: 29.99, image: 'https://via.placeholder.com/300' },
];

const Home = () => {
    const carouselItems = [];
  
    for (let i = 0; i < products.length; i += 4) {
      const items = products.slice(i, i + 4).map(product => (
        <div className="col-md-3 d-flex justify-content-center" key={product.id}>
          <Card product={product} />
        </div>
      ));
      carouselItems.push(
        <Carousel.Item key={i}>
          <div className="row">
            {items}
          </div>
        </Carousel.Item>
      );
    }
  
    return (
        <div id="main-wrapper" className="d-flex flex-column min-vh-100">
          <NavBar />
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="container-fluid text-center">
              <img src={portada} alt="Portada" className="img-fluid" />
              <h2 className="mt-4 mb-3">NEW IN - *NOMBRE TIENDA*</h2>
              <Carousel indicators={false} interval={4000} pause={false}>
                {carouselItems}
              </Carousel>
            </div>
          </div>
          <Footer />
        </div>
      );
    };
    
    export default Home;