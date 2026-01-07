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
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchFavourites() as any);
  }, [dispatch, isAuthenticated, navigate]);

  if (items.length === 0) {
    return (
      <main className={styles.favourites}>
        <h1>Favourites</h1>
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
    <div className={styles.favourites}>
      <h1>Favourite items ({items.length})</h1>
      <ProductGrid products={items}/>
    </div>
  );
};

export default Favourites;
