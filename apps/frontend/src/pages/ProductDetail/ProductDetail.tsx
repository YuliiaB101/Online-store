import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { addToFavourites, removeFromFavourites } from '../../store/slices/favouritesSlice';
import { addToast } from '../../store/slices/toastSlice';
import { RootState, Product } from '../../types';
import { useAuth } from '../../store/slices/authSlice';
import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { currentProduct: product } = useSelector((state: RootState) => state.products);
  const { isAuthenticated } = useAuth();
  const { items: Favourites } = useSelector((state: RootState) => state.favourites);

  const isFavourite = Favourites.some((fav: Product) => fav.id === product?.id); useEffect(() => {
    dispatch(fetchProductById(id) as any);
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `${location.pathname}${location.search}${location.hash}` } });
      return;
    }
    if (product) {
      dispatch(addToCart({ productId: product.id, quantity }) as any);
      dispatch(addToast({
        message: `${product.name} (x${quantity}) added to cart!`,
        type: 'success',
      }));
    }
  };

  const handleFavouriteClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `${location.pathname}${location.search}${location.hash}` } });
      return;
    }

    if (product) {
      if (isFavourite) {
        dispatch(removeFromFavourites(product.id) as any);
        dispatch(addToast({
          message: `${product.name} removed from favourites!`,
          type: 'info'
        }))
      } else {
        dispatch(addToFavourites(product.id) as any);
        dispatch(addToast({
          message: `${product.name} added to favourites!`,
          type: 'success'
        }))
      }
    }
  };

  if (!product) {
    return <div className={styles.loading}>Product not found</div>;
  }

  return (
    <main className={styles.productDetail}>
      <Link to='/products' className={styles.productDetail__back}>
        <img className={styles.productDetail__backIcon} src="/icons/arrow-left.svg" alt="Previous" />
        Back to Products
      </Link>

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
          <h2 className={styles.productDetail__title}>{product.name}</h2>
          <button
            onClick={handleFavouriteClick}
            className={styles.productDetail__favourite}
            aria-label="Add to Favourites"
          >
            {isFavourite ? (
              <img
                src="/icons/heart-full.svg"
                alt="favourite"
                className={styles.productDetail__favouriteIcon}
              />
            ) : (
              <img
                src="/icons/heart.svg"
                alt="favourite"
                className={styles.productDetail__favouriteIcon}
              />
            )}
          </button>
          <p className={styles.productDetail__description}>{product.description}</p>

          <div className={styles.productDetail__priceRating}>
            <div className={styles.productDetail__price}>${product.price}</div>

            <div className={styles.productDetail__rating}>
              {'★'.repeat(Math.min(5, Math.max(0, Math.round(product.rating_avg))))}
              <span>({product.rating_count})</span>
            </div>
          </div>

          <div className={styles.productDetail__actions}>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className={styles.productDetail__quantity}
            />
            <button
              onClick={handleAddToCart}
              className={styles.productDetail__button}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
