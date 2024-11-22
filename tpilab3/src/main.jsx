import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AuthProvider } from "./services/AuthenticationContext";
import { CartProvider } from "./services/CartContext"; 
//cart esta por encima porque el auth tiene que acceder a clear cart y el acceso de las funciiones va de adentro para afuera
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider> 
      <AuthProvider>
        <App />
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
  
);