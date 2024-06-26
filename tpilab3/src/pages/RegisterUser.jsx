import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAuth } from '../services/AuthenticationContext';

const RegisterUser = () => {
  const {login} = useAuth();

  const handleLogin = () => {
    login();
    console.log("Login")
  };

  return (
    <div>
      <NavBar /> 
      {/* fijarse si aca va la navbar o la hacemos custom */}
      <h1>Register User Page</h1>
      <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
      <Footer />

    </div>
  );
};

export default RegisterUser;