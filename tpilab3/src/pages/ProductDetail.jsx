import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { Carousel } from 'react-bootstrap';



const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fake-api-nodejs-m072.onrender.com/products')
    .then(response => response.json())
    .then(data => setProducts(data))
    .catch(error => console.log(error));
  }, []);

  const product = products.find(p => p.id === parseInt(id));  

  const carouselItems = products.filter(product => (
    product.featured == true
  ));
  

  // for (let i = 0; i < products.length; i += 4) {
  //   const items = products.slice(i, i + 4).map(product => (
  //     <div className="col-md-3 d-flex justify-content-center" key={product.id}>
  //       <Card product={product} />
  //     </div>
  //   ));
  //   carouselItems.push(
  //     <Carousel.Item key={i}>
  //       <div className="row justify-content-center">
  //         {items}
  //       </div>
  //     </Carousel.Item>
  //   );
  // }

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
          {/* <Carousel indicators={false} interval={4000} pause={false}>
            {carouselItems ? carouselItems : <div className="text-center">No hay productos para mostrar</div>}
          </Carousel> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;