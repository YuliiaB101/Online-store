import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavourites } from '../../store/slices/favouritesSlice';
import { RootState } from '../../types';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import styles from './Favourites.module.scss';

const Favourites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.favourites);

  useEffect(() => {
    dispatch(fetchFavourites() as any);
  }, [dispatch]);

  if (items.length === 0) {
    return (
      <main className={styles.favourites}>
        <h1 className={styles.favourites__title}>Favourites</h1>
        <div className={styles.favourites__empty}>
          <p>There are no favourite products yet</p>
          <button onClick={() => navigate('/products')}>
            Go to shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.favourites}>
      <h1 className={styles.favourites__title}>Favourite items ({items.length})</h1>
      <ProductGrid products={items}/>
    </main>
  );
};

export default Favourites;
