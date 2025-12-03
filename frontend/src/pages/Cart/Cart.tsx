import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../../store/slices/cartSlice';
import { RootState, CartItem } from '../../types';
import styles from './Cart.module.scss';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchCart() as any);
  }, [dispatch, isAuthenticated, navigate]);

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartItem({ id, quantity }) as any);
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id) as any);
  };

  const handleClearCart = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      dispatch(clearCart() as any);
    }
  };

  const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  if (loading) {
    return <div className={styles.cart}>Загрузка...</div>;
  }

  if (items.length === 0) {
    return (
      <div className={styles.cart}>
        <div className={styles.cart__empty}>
          <h2>Ваша корзина пуста</h2>
          <button onClick={() => navigate('/')}>
            Перейти к покупкам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h1 className={styles.cart__title}>Корзина</h1>
      
      <div className={styles.cart__content}>
        <div className={styles.cart__items}>
          {items.map((item) => (
            <div key={item.id} className={styles.cart__item}>
              <img
                src={item.image_url}
                alt={item.name}
                className={styles.cart__itemImage}
              />
              
              <div className={styles.cart__itemInfo}>
                <h3 className={styles.cart__itemName}>{item.name}</h3>
                <div className={styles.cart__itemCategory}>{item.category_name}</div>
                <div className={styles.cart__itemPrice}>${item.price}</div>
              </div>

              <div className={styles.cart__itemActions}>
                <button
                  onClick={() => handleRemove(item.id)}
                  className={styles.cart__removeButton}
                >
                  ✕
                </button>

                <div className={styles.cart__quantity}>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className={styles.cart__quantityButton}
                  >
                    −
                  </button>
                  <span className={styles.cart__quantityValue}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className={styles.cart__quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cart__summary}>
          <h2 className={styles.cart__summaryTitle}>Итого</h2>
          
          <div className={styles.cart__summaryRow}>
            <span>Товары ({items.length}):</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className={styles.cart__summaryRow}>
            <span>Итого:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className={styles.cart__checkoutButton}>
            Оформить заказ
          </button>

          <button 
            onClick={handleClearCart}
            className={styles.cart__clearButton}
          >
            Очистить корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
