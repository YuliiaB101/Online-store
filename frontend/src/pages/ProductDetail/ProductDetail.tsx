import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, likeProduct } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { RootState, Product } from '../../types';
import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProduct: product, loading } = useSelector((state: RootState) => state.products);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items: favorites } = useSelector((state: RootState) => state.favorites);

  const isFavorite = favorites.some((fav: Product) => fav.id === product?.id);  useEffect(() => {
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

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (product) {
      if (isFavorite) {
        dispatch(removeFromFavorites(product.id) as any);
      } else {
        dispatch(addToFavorites(product.id) as any);
      }
    }
  };

  const handleLike = () => {
    if (product) {
      dispatch(likeProduct(product.id) as any);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (!product) {
    return <div className={styles.loading}>Товар не найден</div>;
  }

  return (
    <div className={styles.productDetail}>
      <button onClick={() => navigate('/')} className={styles.productDetail__back}>
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
          <div className={styles.productDetail__price}>${product.price}</div>
          <p className={styles.productDetail__description}>
            {product.description || 'Описание товара отсутствует.'}
          </p>
          
          <div className={styles.productDetail__likes} onClick={handleLike}>
            ❤️ <span>{product.likes}</span> нравится
          </div>

          <div className={styles.productDetail__actions}>
            <button
              onClick={handleAddToCart}
              className={`${styles.productDetail__button} ${styles['productDetail__button--primary']}`}
            >
              Добавить в корзину
            </button>
            {isAuthenticated && (
              <button
                onClick={handleFavoriteToggle}
                className={`${styles.productDetail__button} ${styles['productDetail__button--favorite']} ${
                  isFavorite ? styles.active : ''
                }`}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
