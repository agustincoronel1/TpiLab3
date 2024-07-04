import {useState} from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import RegisterAdmin from './pages/RegisterAdmin';
import UserTable from './pages/UserTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PrivateRoute from './services/PrivateRoute';
import { AuthProvider } from './services/AuthenticationContext';
import RegisterUser from './pages/RegisterUser';

const App = () => {
  const [cart, setCart] = useState([]);
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
            <Home />
      ),
    },
    {
      path: "/login",
      element: (
          <LoginPage />
      ),
    },
    {
      path: '/shop',
      element: (
          <Shop carts={setCart} />
      ),
    },
    {
      path: '/cart',
      element: (
        <PrivateRoute element={<Cart cart={cart} setCart={setCart}/>}/>
      ),
    },
    {
      path: "/users",
      element: (
          <UserTable />
      )
    },
    {
      path: "/product/:id",
      element: (
          <ProductDetail />
      ),
    },
    {
      path: "/register",
      element: (
          <RegisterUser />
      ),
    },

  ]);

  
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;