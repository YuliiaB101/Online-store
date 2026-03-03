import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import styles from './SmallProductCard.module.scss';

interface SmallProductCardProps {
  product: Product;
}

const SmallProductCard: React.FC<SmallProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.card__imageWrapper}>
        <img
          src={product.image_url}
          alt={product.name}
          className={styles.card__image}
        />
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{product.name}</h3>
        <div className={styles.card__footer}>
          <span className={styles.card__price}>{product.price} €</span>
          <div className={styles.card__rating}>
            {'★'.repeat(Math.min(5, Math.max(0, Math.round(product.rating_avg))))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallProductCard;
