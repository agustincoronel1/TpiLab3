import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const EditProductForm = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: '',
    on_sale: false,
    sizes: [],
    featured: false,
  });

  async function fetchData() {
    try {
      const response = await fetch(
        'https://fake-api-nodejs-m072.onrender.com/products'
      );
      const json = await response.json();
      setProducts(json);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && products.length > 0) {
      const productFromId = products.find((prod) => prod.id == id);
      if (productFromId) {
        setProduct(productFromId);
        setFormData({
          name: productFromId.name,
          price: productFromId.price,
          stock: productFromId.stock,
          image: productFromId.image,
          on_sale: productFromId.on_sale,
          sizes: productFromId.sizes || [],
          featured: productFromId.featured,
        });
      }
    }
  }, [loading, products, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = formData.sizes.map((sizeObj, i) =>
      i === index ? { ...sizeObj, [field]: field === 'stock' ? parseInt(value, 10) : value } : sizeObj
    );
    setFormData({
      ...formData,
      sizes: updatedSizes,
    });
  };

  const handleAddSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: '', stock: 0 }],
    });
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      sizes: updatedSizes,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://fake-api-nodejs-m072.onrender.com/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      alert('Producto actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="container flex-grow-1 py-5">
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : (
          product ? (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <img src={formData.image} alt={formData.name} className="img-fluid" />
                  <div className="mb-3">
                    <label className="form-label">Imagen URL</label>
                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                  <div className="mb-3">
                    <label className="form-label">Nombre del Producto</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Talles y Stock</label>
                    {formData.sizes.map((sizeObj, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <input
                          type="text"
                          className="form-control me-2"
                          placeholder="Talle"
                          value={sizeObj.size}
                          onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                        />
                        <input
                          type="number"
                          className="form-control me-2"
                          placeholder="Stock"
                          value={sizeObj.stock}
                          onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveSize(index)}
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddSize}
                    >
                      Agregar Talle
                    </button>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="on_sale"
                      checked={formData.on_sale}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">En Venta</label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Destacado</label>
                  </div>
                  <button className="btn btn-dark mt-3" type="submit">
                    Actualizar Producto
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>404 NOT FOUND</div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditProductForm;