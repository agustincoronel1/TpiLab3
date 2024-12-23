import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { useAuth } from '../services/AuthenticationContext'; // Importa el contexto de autenticación

const Home = () => {
  const carouselItems = [];
  const [products, setProducts] = useState([]);
  const { userRole } = useAuth(); 

  useEffect(() => {
    fetch('https://fake-api-nodejs-m072.onrender.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  // filtramos productos según el rol del usuario
  const filteredProducts =
    userRole === 'admin' || userRole === 'seller'
      ? products // Mostrar todos los productos
      : products.filter(product => product.on_sale); // mostrar solo productos en oferta

  // creamos los elementos del carrusel en grupos de 4 productos
  for (let i = 0; i < filteredProducts.length; i += 4) {
    const items = filteredProducts.slice(i, i + 4).map(product => (
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
      <div
        className="w-100"
        style={{
          backgroundImage:
            "url('https://acdn.mitiendanube.com/stores/004/690/284/themes/recife/2-slide-1724688590539-2645534423-9593b503bb01c262b0ac5dd856528e4f1724688594-1920-1920.webp?673934867')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "700px", // Asegura que el banner se vea debajo del NavBar
        }}
      >
      </div>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="container-fluid text-center">
          <h2 className="mt-4 mb-3">TIENDA ROSARIO</h2>
          <div className="mb-5">
            <Carousel
              indicators={false}
              interval={4000}
              pause={false}
              controls={false}
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
