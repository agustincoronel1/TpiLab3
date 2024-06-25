import {useEffect, useState} from 'react';
import { ArrowDown, Filter } from 'react-bootstrap-icons';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://fake-api-nodejs-m072.onrender.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);
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
