import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <h1>Home Page Content</h1>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

