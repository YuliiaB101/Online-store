import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchBanners } from '../../store/slices/bannersSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { fetchFavorites } from '../../store/slices/favoritesSlice';
import { RootState, Product } from '../../types';
import styles from './Home.module.scss';
// import Carousel from 'components/Carousel/Carousel';
import BannerProductCard from 'components/BannerProductCard/BannerProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items: products } = useSelector((state: RootState) => state.products);
  const { items: categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories() as any);
    dispatch(fetchBanners() as any);
    dispatch(fetchProducts({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart() as any);
      dispatch(fetchFavorites() as any);
    }
  }, [dispatch, isAuthenticated]);

  // Get one product per category
  const categoryProducts: Product[] = categories.map(category => {
    return products.find(product => product.category_id === category.id);
  }).filter((product): product is Product => product !== undefined);

  return (
    <div className={styles.home}>

      <div className={styles.home__content}>
        <section className={styles.home__content__section}>
          <span className={styles.home__content__section_top}>
            <h3>We make your home feel cozy</h3>
            <p>Coziness is more than interior design.
              It's a feeling — warmth, calm, and harmony that turns a space into a home.</p>
          </span>
          <span className={styles.home__content__section_bottom}>
            <p>Discover the perfect houseplants to enhance your home decor and create a calming atmosphere. Our curated selection brings nature indoors, effortlessly.</p>
          </span>
        </section>

        <span className={styles.home__content__carousel}>
        </span>
      </div>

      <div className={styles.home__top}>
        <h2>Our Top products for You</h2>
        <div className={styles.home__top__products}>
          {categoryProducts.map((product) => (
            <BannerProductCard key={product.id} product={product} />
          ))}
        </div>

        <h2>Top Categories</h2>
        <div className={styles.home__top__categories}>
          <div>
            <img src="/images/categories/category-plants-indoor.jpg" alt="indoor_plants" />
            <p>Indoor Plants</p>
          </div>
          <div>
            <img src="/images/categories/category-plants-outdoor.jpg" alt="outdoor_plants" />
            <p>Outdoor Plants</p>
          </div>
          <div>
            <img src="/images/categories/category-pots.jpg" alt="pots" />
            <p>Pots</p>
          </div>
          <div>
            <img src="/images/categories/category-accessories.jpg" alt="accessories" />
            <p>Accessories</p>
          </div>
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
