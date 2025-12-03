import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchBanners } from '../../store/slices/bannersSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { fetchFavorites } from '../../store/slices/favoritesSlice';
import { RootState } from '../../types';
import BannerCarousel from '../../components/BannerCarousel/BannerCarousel';
import Filters from '../../components/Filters/Filters';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading, filters } = useSelector((state: RootState) => state.products);
  const { items: banners } = useSelector((state: RootState) => state.banners);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCategories() as any);
    dispatch(fetchBanners() as any);
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart() as any);
      dispatch(fetchFavorites() as any);
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(fetchProducts(filters) as any);
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
