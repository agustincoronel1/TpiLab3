import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Person, Cart } from 'react-bootstrap-icons';
import { useAuth } from '../services/AuthenticationContext'; 

const NavBar = () => {
  const { isAuthenticated, logout, userRole } = useAuth();  

  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Tienda Rosario</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Productos</Link>
            </li>
            {userRole === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/users">Usuarios</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="d-flex">
          {isAuthenticated ? (
            <>
              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={toggleLogout}
              >
                <Person />
              </Button>
              {showLogout && (
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={logout}
                  style={{ position: 'absolute', top: '100%' }}
                >
                  Cerrar sesión
                </Button>
              )}
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-secondary">
              Iniciar sesión
            </Link>
          )}
          {userRole !== 'admin' && (
            <Link to="/cart" className="btn btn-outline-secondary">
              <Cart />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


