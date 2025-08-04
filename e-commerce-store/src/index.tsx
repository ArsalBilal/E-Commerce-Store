import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from './services/cartContext';
import 'rsuite/dist/rsuite.min.css';
import 'react-notifications/lib/notifications.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
