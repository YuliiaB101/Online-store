import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../types';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: favoriteItems } = useSelector((state: RootState) => state.favorites);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__content}>
          <Link to="/home" className={styles.header__logo}>
            STORE
          </Link>

          <nav className={styles.header__nav}>
            <Link to="/home" className={styles.header__link}>
              Каталог
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/favorites" className={styles.header__link}>
                  Избранное
                  {favoriteItems.length > 0 && (
                    <span className={styles.header__linkBadge}>
                      {favoriteItems.length}
                    </span>
                  )}
                </Link>
                <Link to="/cart" className={styles.header__link}>
                  Корзина
                  {cartItems.length > 0 && (
                    <span className={styles.header__linkBadge}>
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </>
            )}
          </nav>

          <div className={styles.header__actions}>
            {isAuthenticated ? (
              <>
                <span className={styles.header__link}>{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className={`${styles.header__button} ${styles['header__button--outlined']}`}
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className={`${styles.header__button} ${styles['header__button--outlined']}`}>
                    Войти
                  </button>
                </Link>
                <Link to="/register">
                  <button className={styles.header__button}>
                    Регистрация
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
