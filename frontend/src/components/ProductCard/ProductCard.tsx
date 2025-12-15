import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { Product, RootState } from '../../types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items: favorites } = useSelector((state: RootState) => state.favorites);

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(product.id) as any);
    } else {
      dispatch(addToFavorites(product.id) as any);
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productCard__imageWrapper} onClick={handleCardClick}>
        <img
          src={product.image_url}
          alt={product.name}
          className={styles.productCard__image}
        />
        <button
          onClick={handleFavoriteClick}
          className={`${styles.productCard__favorite} ${isFavorite ? styles['productCard__favorite--active'] : ''
            }`}
          aria-label="Add to favorites"
        >
          <img
            src="/icons/heart.svg"
            alt="favorite"
            className={styles.productCard__favoriteIcon}
          />
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
            onClick={(e) => {
              e.stopPropagation();
              // dispatch add to cart action
            }}
          >
            <img src="/icons/cart1.svg" alt="Add to cart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
