import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import portada from '../assets/portada.jpg'; // Importa la imagen desde assets

const Home = () => {
  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="container-fluid">
          <img src={portada} alt="Portada" className="img-fluid" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

