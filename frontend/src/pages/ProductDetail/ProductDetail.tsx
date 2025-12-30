import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { addToFavourites, removeFromFavourites } from '../../store/slices/favouritesSlice';
import { RootState, Product } from '../../types';
import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProduct: product } = useSelector((state: RootState) => state.products);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items: Favourites } = useSelector((state: RootState) => state.favourites);

  const isfavourite = Favourites.some((fav: Product) => fav.id === product?.id); useEffect(() => {
    dispatch(fetchProductById(id) as any);
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (product) {
      dispatch(addToCart({ productId: product.id, quantity: 1 }) as any);
      navigate('/cart');
    }
  };

  const handlefavouriteToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (product) {
      if (isfavourite) {
        dispatch(removeFromFavourites(product.id) as any);
      } else {
        dispatch(addToFavourites(product.id) as any);
      }
    }
  };

  if (!product) {
    return <div className={styles.loading}>Товар не найден</div>;
  }

  return (
    <div className={styles.productDetail}>
      <button onClick={() => navigate('/home')} className={styles.productDetail__back}>
        ← Назад к каталогу
      </button>

      <div className={styles.productDetail__content}>
        <img
          src={product.image_url}
          alt={product.name}
          className={styles.productDetail__image}
        />

        <div className={styles.productDetail__info}>
          <div className={styles.productDetail__category}>
            {product.category_name}
          </div>
          <h1 className={styles.productDetail__title}>{product.name}</h1>
          <p className={styles.productDetail__description}>{product.description}</p>

          <div className={styles.productDetail__priceRating}>
            <div className={styles.productDetail__price}>${product.price}</div>

            <div className={styles.productDetail__rating}>
              {'★'.repeat(Math.min(5, Math.max(0, Math.round(product.rating_avg))))}
              <span>({product.rating_count})</span>
            </div>
          </div>

          <div className={styles.productDetail__actions}>
            <input type="number" min="1" defaultValue="1" className={styles.productDetail__quantity} />
            <button
              onClick={handleAddToCart}
              className={styles.productDetail__button}
            >
              Add to Cart
            </button>
            {isAuthenticated && (
              <button
                onClick={handlefavouriteToggle}
                className={`${styles.productDetail__button} ${styles['productDetail__button--favourite']} ${isfavourite ? styles.active : ''
                  }`}
              >
                {isfavourite ? '❤️' : '🤍'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
