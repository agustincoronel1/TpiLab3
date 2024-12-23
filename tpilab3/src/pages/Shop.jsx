import { useEffect, useState } from 'react';
import { ArrowDown, Filter } from 'react-bootstrap-icons';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { useAuth } from '../services/AuthenticationContext'; // Importar el contexto de autenticación

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [filter, setFilter] = useState('');
  const { userRole } = useAuth(); // Obtener el rol del usuario

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fake-api-nodejs-m072.onrender.com/products');
        const data = await response.json();

        // filtrar los productos según el rol del usuario
        const initialProducts =
          userRole === 'admin' || userRole === 'seller'
            ? data // Mostrar todos los productos
            : data.filter((product) => product.on_sale); //mostrar solo productos en oferta

        setProducts(initialProducts);
        setFilteredProducts(initialProducts); // inicializar los productos filtrados
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [userRole]);

  // Función para manejar el ordenamiento
  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);

    const sorted = [...filteredProducts].sort((a, b) =>
      newOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(sorted);
  };

  // Función para manejar el filtrado
  const handleFilter = (type) => {
    setFilter(type);
    if (type === '') {
      setFilteredProducts(products); // Mostrar todos los productos si no hay filtro
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(type.toLowerCase())
        )
      );
    }
  };

  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1">
        <div className="container py-5">
          <h1 className="mb-4">Productos</h1>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <button className="btn btn-brown me-2" onClick={handleSort}>
                <ArrowDown className="me-2" />
                Ordenar por precio ({sortOrder === 'asc' ? 'Ascendente' : sortOrder === 'desc' ? 'Descendente' : 'Ninguno'})
              </button>
              <div className="dropdown d-inline-block">
                <button
                  className="btn btn-brown dropdown-toggle"
                  type="button"
                  id="filterDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Filter className="me-2" />
                  Filtrar por tipo
                </button>
                <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                  <li>
                    <button className="dropdown-item" onClick={() => handleFilter('')}>
                      Todos
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleFilter('remera')}>
                      Remeras
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleFilter('buzo')}>
                      Buzos
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleFilter('camisa')}>
                      Camisas
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleFilter('musculosa')}>
                      Musculosas
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            {filteredProducts.map((product) => (
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
