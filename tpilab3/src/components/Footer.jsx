import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';

const App = ({ children }) => {
  return (
    <div className="App">
      <NavBar />
      <main className="container">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default App;
