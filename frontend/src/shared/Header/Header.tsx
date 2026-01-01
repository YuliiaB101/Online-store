import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../types';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: favouriteItems } = useSelector((state: RootState) => state.favourites);

  const handleLogout = () => {
    console.log('Logout clicked');
    dispatch(logout());
    setIsDropdownOpen(false);
    console.log('Logout completed');
    // navigate('/home');
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Logout button clicked');
    handleLogout();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
                {cartItems.map(item => item.quantity).reduce((a, b) => a + b, 0)}
              </span>
            )}
          </Link>

          <div className={styles.header__userWrapper}>
            {isAuthenticated ? (
              <div>
                <img 
                  className={styles.header__icon} 
                  src="/icons/user.svg" 
                  alt="User"
                  onClick={toggleDropdown}
                  style={{ cursor: 'pointer' }}
                />
                <div className={`${styles.header__dropdown} ${isDropdownOpen ? styles.header__dropdown_open : ''}`}>
                  <span className={styles.header__userName}>{user?.name}</span>
                  <button 
                    onClick={handleLogoutClick} 
                    className={styles.header__logoutButton}
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <img className={styles.header__icon} src="/icons/user.svg" alt="User" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header >
  );
};

export default Header;
