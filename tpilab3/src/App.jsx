import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';  
import LoginPage from './pages/LoginPage';
import RegisterAdmin from './pages/RegisterAdmin';
import UserTable from './pages/UserTable';
import RegisterUser from './pages/RegisterUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PrivateRoute from './services/PrivateRoute';
import { AuthProvider } from './services/AuthenticationContext';
import ProductForm from './pages/ProductForm';
import NotFound from './pages/NotFound';

const App = () => {
  const [cart, setCart] = useState([]);

  const router = createBrowserRouter([ //este createBrowserRouter es lo que permite el enrutado dinamico 

    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/shop',
      element: <Shop carts={setCart} />,
    },
    {
      path: '/cart',
      element: <PrivateRoute element={<Cart cart={cart} setCart={setCart} />} />,
    },
    {
      path: '/checkout',
      element: <PrivateRoute element={<Checkout />} />,  
    },
    {
      path: '/users',
      element: <PrivateRoute roles={['admin']} element={<UserTable />} />,
    },
    {
      path: '/product/:id',
      element: <ProductDetail />,
    },
    {
      path: '/register',
      element: <RegisterUser />,
    },
    {
      path: '/register-admin',
      element: <PrivateRoute roles={['admin']} element={<RegisterAdmin />} />,
    },
    {
      path: '/productedit/:id/',
      element: <PrivateRoute roles={['admin', 'seller']} element={<ProductForm />} />,
    },
    {
      path: '*', // ruta comodin para capturar URLs no encontradas
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
