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
  const { items: favouriteItems } = useSelector((state: RootState) => state.favourites);

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate('/home');
  // };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {/* Logo section */}
        <Link to="/home" className={styles.header__logo}>
          <img className={styles.header__logo} src="/icons/page-logo.svg" alt="Logo" />
        </Link>

        {/* Navigation links section */}
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
            className={({ isActive }) => isActive
              ? `${styles.header__navLink} ${styles.active}`
              : styles.header__navLink
            }>
            For Customers
          </NavLink>
          <NavLink to="/contacts"
            className={({ isActive }) => isActive
              ? `${styles.header__navLink} ${styles.active}`
              : styles.header__navLink
            }>
            Contacts
          </NavLink>
        </nav>

        {/* Header icons section */}
        <div className={styles.header__icons}>
          <Link to="#">
            <img className={styles.header__icon} src="/icons/search.svg" alt="Search" />
          </Link>

          <Link to="/favourites">
            {isAuthenticated ? (
              <>
                <img className={styles.header__icon} src="/icons/heart-full.svg" alt="Favourites" />
                {favouriteItems.length > 0 && (
                  <span className={styles.header__iconBadge}>
                    {favouriteItems.length}
                  </span>
                )}
              </>
            )
              :
              <img className={styles.header__icon} src="/icons/heart.svg" alt="Favourites" />
            }
          </Link>

          <Link to="/cart">
            <img className={styles.header__icon} src="/icons/cart1.svg" alt="Cart" />
            {isAuthenticated && cartItems.length > 0 && (
              <span className={styles.header__iconBadge}>
                {cartItems.length}
              </span>
            )}
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
