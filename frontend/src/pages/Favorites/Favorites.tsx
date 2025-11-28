import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../store/slices/favoritesSlice';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import styles from './Favorites.module.scss';

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.favorites);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchFavorites());
  }, [dispatch, isAuthenticated, navigate]);

  if (loading) {
    return <div className={styles.favorites}>Загрузка...</div>;
  }

  if (items.length === 0) {
    return (
      <div className={styles.favorites}>
        <h1 className={styles.favorites__title}>Избранное</h1>
        <div className={styles.favorites__empty}>
          <h2>У вас пока нет избранных товаров</h2>
          <button onClick={() => navigate('/')}>
            Перейти к покупкам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.favorites}>
      <h1 className={styles.favorites__title}>Избранное ({items.length})</h1>
      <ProductGrid products={items} loading={loading} />
    </div>
  );
};

export default Favorites;
