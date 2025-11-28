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
    <div className={styles.productCard} onClick={handleCardClick}>
      <img
        src={product.image_url}
        alt={product.name}
        className={styles.productCard__image}
      />
      <div className={styles.productCard__content}>
        <div className={styles.productCard__category}>
          {product.category_name}
        </div>
        <h3 className={styles.productCard__title}>{product.name}</h3>
        <div className={styles.productCard__price}>${product.price}</div>
        <div className={styles.productCard__footer}>
          <div className={styles.productCard__likes}>
            ❤️ <span>{product.likes}</span>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleFavoriteClick}
              className={`${styles.productCard__favorite} ${
                isFavorite ? styles['productCard__favorite--active'] : ''
              }`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
