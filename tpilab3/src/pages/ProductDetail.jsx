import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { Carousel } from 'react-bootstrap';



const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const carouselItems = [];
  
  
  async function fetchData() {
    try {
      const response = await fetch(
        'https://fake-api-nodejs-m072.onrender.com/products'
      );
      const json = await response.json();
      console.log(json);
      setProducts(json);
      setLoading(false);
      

    } catch (e) {
      console.error(e);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {

    if (!loading && products.length > 0) {
      console.log("HOLA");
      console.log(products);
      const productFromId = products.find(prod => prod.id == id);
      console.log(productFromId);
      if (productFromId) {
        setProduct(productFromId);
      }
      
    }
  }, [loading, products, id, carouselItems]);



  const createCarouselItems = () => {
    const featuringProducts = products.filter(product => product.featured);
    console.log(featuringProducts);

    if (featuringProducts.length > 0) {
      
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
    }
    console.log(carouselItems);
  }
  createCarouselItems();

  return (

    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="container flex-grow-1 py-5">
        {/* Añadido loading */
          loading ? <div className="text-center">Cargando...</div> : 
            product ?
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
                    {product.sizes ? product.sizes.map(size => (
                      <button
                        key={size}
                        className="btn btn-outline-secondary me-2 mb-2"
                      >
                        {size}
                      </button>
                    )): <div></div>}
                  </div>
                </div>
                <button className="btn btn-dark mt-3">Agregar al carrito</button>
              </div>
              <div className="mt-5">
                <h2 className="text-center mb-4">TAMBIÉN TE PUEDE INTERESAR</h2>
                <Carousel 
                  indicators={false} 
                  interval={4000} 
                  pause={false}
                  controls={false} // Ocultar las flechas de control
                >
                  {carouselItems}
                </Carousel>
              </div>
            </div> : <div> 404 NOT FOUND</div>
        }


      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;