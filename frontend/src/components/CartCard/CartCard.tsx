import { CartItem } from '../../types';
import styles from './CartCard.module.scss';

interface CartCardProps {
  item: CartItem;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({ item, onIncrement, onDecrement, onRemove }) => {
  return (
    <div className={styles.cartCard}>
      <img
        src={item.image_url}
        alt={item.name}
        className={styles.cartCard__image}
      />
      
      <div className={styles.cartCard__info}>
        <h3 className={styles.cartCard__name}>{item.name}</h3>
        <div className={styles.cartCard__category}>{item.category_name}</div>
        <div className={styles.cartCard__price}>${item.price}</div>
      </div>

      <div className={styles.cartCard__actions}>
        <button
          onClick={() => onRemove(item.id)}
          className={styles.cartCard__removeButton}
        >
          ✕
        </button>

        <div className={styles.cartCard__quantity}>
          <button
            onClick={() => onDecrement(item.id)}
            disabled={item.quantity <= 1}
            className={styles.cartCard__quantityButton}
          >
            −
          </button>
          <span className={styles.cartCard__quantityValue}>{item.quantity}</span>
          <button
            onClick={() => onIncrement(item.id)}
            className={styles.cartCard__quantityButton}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
