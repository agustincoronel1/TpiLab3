import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import Home from './views/Home';
import Shop from './views/Shop';
import ProductDetail from './views/ProductDetail';
import Cart from './views/Cart';
import RegisterUser from './views/RegisterUser';
import RegisterAdmin from './views/RegisterAdmin';
import Admin from './views/Admin';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'; 

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/shop/:product" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/register/user" component={RegisterUser} />
        <Route path="/register/admin" component={RegisterAdmin} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
);

