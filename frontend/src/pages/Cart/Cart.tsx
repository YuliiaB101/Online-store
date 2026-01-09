import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, incrementQuantity, decrementQuantity, updateCartItem, removeFromCart, clearCart } from '../../store/slices/cartSlice';
import { RootState, CartItem } from '../../types';
import CartCard from '../../components/CartCard/CartCard';
import styles from './Cart.module.scss';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchCart() as any);
  }, [dispatch, isAuthenticated, navigate]);

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
    const item = items.find(i => i.id === id);
    if (item) {
      dispatch(updateCartItem({ id, quantity: item.quantity + 1 }) as any);
    }
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
    const item = items.find(i => i.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateCartItem({ id, quantity: item.quantity - 1 }) as any);
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id) as any);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart() as any);
    }
  };

  const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className={styles.cart}>
        <h1>Cart</h1>
        <div className={styles.cart__empty}>
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/products')}>
            Go to shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.cart}>
      <h1>Cart</h1>
      <span className={styles.cart__subtitle}>Your items in a cart:</span>

      <div className={styles.cart__content}>
        <div className={styles.cart__items}>
          {items.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
              onClick={() => navigate(`/product/${item.id}`)}
            />
          ))}
        </div>

        <div className={styles.cart__summary}>
          <h2 className={styles.cart__summaryTitle}>Total</h2>

          <div className={styles.cart__summaryContent}>
            <span>Items ({items.map(item => item.quantity).reduce((a, b) => a + b, 0)}):</span>
          </div>

          {items.map((item) => (
            <div key={item.id} className={styles.cart__summaryRow}>
              <span>{item.name}:{'\u00A0\u00A0'}<strong>{item.quantity} x ${item.price}</strong></span>
              <span><strong>${(item.quantity * item.price).toFixed(2)}</strong></span>
            </div>
          ))}

          <div className={styles.cart__summaryTotal}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className={styles.cart__checkoutButton}>
            Checkout
          </button>

          <button
            onClick={handleClearCart}
            className={styles.cart__clearButton}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
