import { addToast } from 'store/slices/toastSlice';
import { CartItem } from '../../types';
import { useDispatch } from 'react-redux';
import styles from './CartCard.module.scss';

interface CartCardProps {
  item: CartItem;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
  onClick: () => void;
}

const CartCard: React.FC<CartCardProps> = ({ item, onIncrement, onDecrement, onRemove, onClick }) => {
  const dispatch = useDispatch();
  
  return (
    <div className={styles.cartCard} onClick={onClick} style={{ cursor: 'pointer' }}>
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
          onClick={(e) => {
            e.stopPropagation(); onRemove(item.id);
            dispatch(addToast({
              message: `${item.name} removed from <strong>favourites</strong>!`,
              type: 'info',
            }));
          }}
          className={styles.cartCard__removeButton}
        >
          ✕
        </button>

        <div className={styles.cartCard__quantity}>
          <button
            onClick={(e) => { e.stopPropagation(); onDecrement(item.id); }}
            disabled={item.quantity <= 1}
            className={styles.cartCard__quantityButton}
          >
            −
          </button>
          <span className={styles.cartCard__quantityValue}>{item.quantity}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onIncrement(item.id); }}
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
