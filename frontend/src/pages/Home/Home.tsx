import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../../store/slices/productsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchBanners } from '../../store/slices/bannersSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { fetchFavorites } from '../../store/slices/favoritesSlice';
import { RootState } from '../../types';
// import Filters from '../../components/Filters/Filters';
// import ProductGrid from '../../components/ProductGrid/ProductGrid';
import styles from './Home.module.scss';
import BannerCarousel from 'components/BannerCarousel/BannerCarousel';

const Home = () => {
  const dispatch = useDispatch();
  // const { items: filters } = useSelector((state: RootState) => state.products);
  // const { items: banners } = useSelector((state: RootState) => state.banners);
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

  // useEffect(() => {
  //   dispatch(fetchProducts(filters) as any);
  // }, [dispatch, filters]);

  const productImages = [
    '/images/products/plant-1.webp',
    '/images/products/plant-2.webp',
    '/images/products/plant-3.webp',
    '/images/products/plant-4.webp',
    '/images/products/plant-5.webp',
    '/images/products/plant-6.webp',
    '/images/products/plant-7.webp',
    '/images/products/plant-8.webp'
  ];

  const banners = productImages.map((image, index) => ({
    id: index + 1,
    image_url: image,
    title: `Plant ${index + 1}`,
    link: '',
    order_index: index,
    active: true
  }));

  return (
    <div className={styles.home}>
      <img className={styles.home__logo} src="/icons/page-logo.svg" alt="FLORIA Logo" />

      <div className={styles.home__content}>
        <section className={styles.home__content_section}>
          <span className={styles.home__content_section_top}>
            <h3>We make your home feel cozy</h3>
            <p>Coziness is more than interior design.
              It's a feeling — warmth, calm, and harmony that turns a space into a home.</p>
          </span>
          <span className={styles.home__content_section_bottom}>
            <p>Discover the perfect houseplants to enhance your home decor and create a calming atmosphere. Our curated selection brings nature indoors, effortlessly.</p>
          </span>
        </section>

        <span className={styles.home__content_carousel}>
          <BannerCarousel banners={banners} />
        </span>
      </div>

      <div className={styles.home__topPlants}>
        <h2>Out top plants 🌿</h2>
        <div className={styles.home__topPlants_grid}>
          {productImages.map((image, index) => (
            <div key={index} className={styles.home__topPlants_item}>
              <img src={image} alt={`Top Plant ${index + 1}`} />
              <h4>Plant {index + 1}</h4>
              <p>$ {(20 + index * 5).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.home__sections}>
        <div className={styles.home__about}>
          <h3>About Us 📌</h3>
          <p>FLORIA is an online plant store dedicated to creating cozy, living spaces.
          </p>
          <p>
            We carefully select indoor plants that fit real life and help bring warmth, balance, and natural beauty into your home.
          </p>
        </div>

        <div className={styles.home__delivery}>
          <h3>Delivery 📦</h3>
          <p>
            We take special care to ensure your plants arrive healthy and beautiful 🌿
          </p>
          <p>
            <ul>
              <li>Every plant is securely and gently packed</li>
              <li>We use eco-friendly, recyclable packaging</li>
              <li>Fast and careful delivery to minimize stress for the plant</li>
            </ul>
          </p>
        </div>

        <div className={styles.home__eco}>
          <h3>Caring for the Planet 🌍</h3>
          <p>
            Plants are more than decor — they are a way to stay connected to nature, even in an urban space.
          </p>
          <p>
            By choosing FLORIA, you support mindful consumption, respect for nature, and a balanced relationship between people and the environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
