import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

  const isFavourite = Favourites.some((fav: Product) => fav.id === product?.id); useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleFavouriteClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (product) {
      if (isFavourite) {
        dispatch(removeFromFavourites(product.id) as any);
      } else {
        dispatch(addToFavourites(product.id) as any);
      }
    }
  };

  if (!product) {
    return <div className={styles.loading}>Product not found</div>;
  }

  return (
    <div className={styles.productDetail}>
      <Link to='/products' className={styles.productDetail__back}>
        <img className={styles.productDetail__backIcon} src="/icons/arrow-left.svg" alt="Previous"/>
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
          <h1 className={styles.productDetail__title}>{product.name}</h1>
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
            <input type="number" min="1" defaultValue="1" className={styles.productDetail__quantity} />
            <button
              onClick={handleAddToCart}
              className={styles.productDetail__button}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
