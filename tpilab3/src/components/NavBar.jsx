import React from 'react';
import { Link } from 'react-router-dom';
import { Person, Cart } from 'react-bootstrap-icons';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Nombre Tienda</Link>
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
          </ul>
        </div>
        <div className="d-flex">
          {/* este boton hay que configurarlo para cuando el usuario este registrado sino lo llevaria a la vista de registro */}
            <Link to="/login" className="btn btn-outline-secondary me-2">
              <Person />
            </Link>
            <Link to="/cart" className="btn btn-outline-secondary">
              <Cart />
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default NavBar;


