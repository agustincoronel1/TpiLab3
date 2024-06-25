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
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://fake-api-nodejs-m072.onrender.com/products'
        );
        const json = await response.json();
        console.log(json);
        setProducts(json);
        if(json.length > 0){
          console.log("HOLA");
          const productFromId = products.find(prod => prod.id == id);
          console.log(productFromId);
          if(productFromId === undefined){
            console.log("No se encontró el producto");
          }else{
            setProduct(productFromId);
            setLoading(false);
          }
          
        }
        
        
        
        // createCarouselItems(json);

      } catch (e) {
        console.error(e);
      }
    };
    fetchData();


    console.log(product);
    console.log(loading);
  }, [loading]);



  // const createCarouselItems = (productsFromApi) => {
  //   const featuringProducts = productsFromApi.filter(product => product.featured);
  //   console.log(featuringProducts);

  //   if (featuringProducts.length > 0) {
  //     for (let i = 0; i < featuringProducts.length; i += 4) {
  //           const items = featuringProducts.slice(i, i + 4).map(product => (
  //             <div className="col-md-3 d-flex justify-content-center" key={product.id}>
  //               <Card product={product} />
  //             </div>
  //           ));
  //           setCarouselItems(...carouselItems,
  //             <Carousel.Item key={i}>
  //               <div className="row justify-content-center">
  //                 {items}
  //               </div>
  //             </Carousel.Item>
  //           );
  //     }
  //   }

  // }


  return (

    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="container flex-grow-1 py-5">
        {/* Añadido loading */
          loading ? <div className="text-center">Cargando...</div> :
          
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
              <div className="mt-5">
                <h2 className="text-center mb-4">TAMBIÉN TE PUEDE INTERESAR</h2>
                {/* <Carousel indicators={false} interval={4000} pause={false}>
            {carouselItems ? carouselItems : <div className="text-center">No hay productos para mostrar</div>}
          </Carousel> */}
              </div>
            </div>
        }


      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;