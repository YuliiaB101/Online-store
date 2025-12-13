import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import AuthForm from './pages/Auth/AuthForm';
import Register from './pages/Auth/Register';
import Cart from './pages/Cart/Cart';
import Favorites from './pages/Favorites/Favorites';
import Checkout from 'pages/Checkout/Checkout';
import './styles/styles.scss';
import AboutUs from 'pages/AboutUs/AboutUs';

const AppContent: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    const app = document.querySelector('.App');
    if (app) {
      // Remove all page classes
      app.className = 'App';
      // Add current page class
      const page = location.pathname.split('/')[1] || 'home';
      app.classList.add(`page-${page}`);
    }
  }, [location]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <footer className="app-footer">
        <p>© 2024 FLORIA. All rights reserved.</p>
      </footer>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
