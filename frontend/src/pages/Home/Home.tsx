import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchBanners } from '../../store/slices/bannersSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { fetchFavorites } from '../../store/slices/favoritesSlice';
import BannerCarousel from '../../components/BannerCarousel/BannerCarousel';
import Filters from '../../components/Filters/Filters';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading, filters } = useSelector((state) => state.products);
  const { items: banners } = useSelector((state) => state.banners);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  return (
    <div className={styles.home}>
      <BannerCarousel banners={banners} />
      <h1 className={styles.home__title}>Каталог товаров</h1>
      <Filters />
      <ProductGrid products={products} loading={loading} />
    </div>
  );
};

export default Home;
