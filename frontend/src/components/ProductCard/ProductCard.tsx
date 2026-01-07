import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourites, removeFromFavourites } from '../../store/slices/favouritesSlice';
import { Product, RootState } from '../../types';
import styles from './ProductCard.module.scss';
import { addToCart } from 'store/slices/cartSlice';
import { addToast } from '../../store/slices/toastSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items: favourites } = useSelector((state: RootState) => state.favourites);

  const isFavourite = favourites.some((fav) => fav.id === product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isFavourite) {
      dispatch(removeFromFavourites(product.id) as any);
      dispatch(addToast({
        message: `${product.name} removed from <strong>favourites</strong>!`,
        type: 'info',
      }));
    } else {
      dispatch(addToFavourites(product.id) as any);
      dispatch(addToast({
        message: `${product.name} added to <strong>favourites</strong>!`,
        type: 'success',
      }));
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    } else {
      dispatch(addToCart({ productId: product.id, quantity: 1 }) as any);
      dispatch(addToast({
        message: `${product.name} added to <strong>cart</strong>!`,
        type: 'success',
      }));
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productCard__imageWrapper} onClick={handleCardClick}>
        <img
          src={product.image_url}
          alt={product.name}
          className={styles.productCard__image}
          loading="lazy"
        />
        <button
          onClick={handleFavouriteClick}
          className={styles.productCard__favourite}
          aria-label="Add to Favourites"
        >
          {isFavourite ? (
            <img
              src="/icons/heart-full.svg"
              alt="favourite"
              className={styles.productCard__favouriteIcon}
            />
          ) : (
            <img
              src="/icons/heart.svg"
              alt="favourite"
              className={styles.productCard__favouriteIcon}
            />
          )}
        </button>
      </div>
      <div className={styles.productCard__content}>
        <h3 className={styles.productCard__title} onClick={handleCardClick}>{product.name}</h3>
        <div className={styles.productCard__category}>
          {product.category_name}
        </div>
        <div className={styles.productCard__footer}>
          <div className={styles.productCard__priceRating}>
            <div className={styles.productCard__price}>{product.price} €</div>
            <div className={styles.productCard__rating}>
              {'★'.repeat(Math.min(5, Math.max(0, Math.round(product.rating_avg))))}
              <span>({product.rating_count})</span>
            </div>
          </div>
          <button
            className={styles.productCard__addToCart}
            onClick={handleCartClick}
            aria-label="Add to Cart"
          >
            <img src="/icons/cart1.svg" alt="Add to cart" />
          </button>
        </div>
      </div>
    </div >
  );
};

export default ProductCard;
