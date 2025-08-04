import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/modules/product/Product'; 
import './styles/App.css';
import ProductsDetails from './components/modules/product/Productdetail'; 
import "bootstrap/dist/css/bootstrap.min.css";
import ProductbyCat from './components/modules/category/ProductbyCat';
import Login from './components/modules/Login/Login';
import Cart from './components/modules/cart/Cart';
import AllCart from './components/modules/cart/AllCarts';
import SessionManager from './components/base/SessionManager'; 
import Success from './components/modules/cart/success';
import PrivateRoute from './components/base/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cancel from './components/modules/cart/cancel';
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NotificationContainer } from 'react-notifications';
import React, { FC, ReactNode } from 'react';

const App: FC = () => {
  return (
    <Router>
      <SessionManager>
        <ToastContainer />
        <NotificationContainer />
        <Routes>
          <Route path="/" element={<Products />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductsDetails />} />
          <Route path="/categories/:id" element={<ProductbyCat />} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/allcarts" element={<AllCart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </SessionManager>
    </Router>
  );
};

export default App;
