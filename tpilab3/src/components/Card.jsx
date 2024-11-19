import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthenticationContext'; 

const Card = ({ product }) => {
  const { userRole } = useAuth(); 

  return (
    <div className="card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
          {userRole === 'admin' || userRole === 'seller' ? (
            <Link
              to={`/productedit/${product.id}`}
              style={{
                backgroundColor: '#5C4033',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                textDecoration: 'none',
              }}
            >
              Editar producto
            </Link>
          ) : (
            <button
              style={{
                backgroundColor: '#5C4033',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
              }}
            >
              Comprar
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;

