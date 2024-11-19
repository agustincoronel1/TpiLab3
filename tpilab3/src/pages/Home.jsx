import {useState, useEffect} from 'react';
import { Carousel } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card'; 
import portada from '../assets/portada.jpg';



const Home = () => {
    const carouselItems = [];
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch('https://fake-api-nodejs-m072.onrender.com/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.log(error));
    }, []);
    
    const featuringProducts = products.filter(product => product.featured);

    for (let i = 0; i < featuringProducts.length; i += 4) {
      const items = featuringProducts.slice(i, i + 4).map(product => (
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
              {/* <img src={portada} alt="Portada" className="img-fluid" /> */}
              <h2 className="mt-4 mb-3">TIENDA ROSARIO</h2>
              <div className="mb-5"> {/* Añadido margin-bottom */}
                <Carousel 
                  indicators={false} 
                  interval={4000} 
                  pause={false}
                  controls={false} // Ocultar las flechas de control
                >
                  {carouselItems}
                </Carousel>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    };
    
    export default Home;