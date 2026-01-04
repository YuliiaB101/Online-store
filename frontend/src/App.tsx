import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './shared/Header/Header';
import ScrollToTop from './components/ScrollToTop';
import { Home, Products, ProductDetail, Login, Register, Cart, Checkout, Favourites, AboutUs, ForCustomers, Contacts, Search } from './pages/index';
import Footer from './shared/Footer/Footer';
import './styles/styles.scss';

const AppContent: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const app = document.querySelector('.App');
    if (app) {
      // Remove all page classes
      app.className = 'App';
      // Add current page class
      const page = location.pathname.split('/')[1] || 'home';
      app.classList.add(`page`, `page-${page}`);
    }
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/for-customers" element={<ForCustomers />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
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
