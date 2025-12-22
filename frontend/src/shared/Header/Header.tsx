import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../types';
// import { IconSearch, IconHeart, IconCart, IconUser } from '../icons';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: favoriteItems } = useSelector((state: RootState) => state.favorites);

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate('/home');
  // };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/home" className={styles.header__logo}>
          <img className={styles.header__logo} src="/icons/page-logo.svg" alt="Logo" />
        </Link>

        <nav className={styles.header__nav}>
          <NavLink to="/products" 
          className={({ isActive }) => isActive
              ? `${styles.header__navLink} ${styles.active}`
              : styles.header__navLink
          }>
            Products
          </NavLink>
          <NavLink to="/about" 
          className={({ isActive }) => isActive
              ? `${styles.header__navLink} ${styles.active}`
              : styles.header__navLink
          }>
            About Us
          </NavLink>
          <NavLink to="/for-customers" 
          className={({ isActive }) =>isActive
              ? `${styles.header__navLink} ${styles.active}`
              : styles.header__navLink
          }>
            For Customers
          </NavLink>
          <NavLink to="/home" 
          className={({ isActive }) => isActive
              ? `${styles.header__navLink} ${styles.active}`
              : styles.header__navLink
          }>
            Contacts
          </NavLink>
        </nav>

        {isAuthenticated && (
          <>
            <Link to="/favorites" className={styles.header__link}>
              Favorites
              {favoriteItems.length > 0 && (
                <span className={styles.header__linkBadge}>
                  {favoriteItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className={styles.header__link}>
              Cart
              {cartItems.length > 0 && (
                <span className={styles.header__linkBadge}>
                  {cartItems.length}
                </span>
              )}
            </Link>
          </>
        )}

        <div className={styles.header__icons}>
          <Link to="#">
            <img className={styles.header__icon} src="/icons/search.svg" alt="Search" />
          </Link>
          <Link to="/favorites">
            <img className={styles.header__icon} src="/icons/heart.svg" alt="Favorites" />
          </Link>
          <Link to="/cart">
            <img className={styles.header__icon} src="/icons/cart1.svg" alt="Cart" />
          </Link>
          <Link to="/login">
            <img className={styles.header__icon} src="/icons/user.svg" alt="User" />
          </Link>
        </div>
      </div>
    </header >
  );
};

export default Header;
