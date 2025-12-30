import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../../store/slices/cartSlice';
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

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartItem({ id, quantity }) as any);
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
      <div className={styles.cart}>
        <div className={styles.cart__empty}>
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/home')}>
            Go to shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h1 className={styles.cart__title}>Cart</h1>
      <span>Your items in a cart: {items.length} items</span>
      
      <div className={styles.cart__content}>
        <div className={styles.cart__items}>
          {items.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div className={styles.cart__summary}>
          <h2 className={styles.cart__summaryTitle}>Total</h2>
          
          <div className={styles.cart__summaryRow}>
            <span>Items ({items.length}):</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className={styles.cart__summaryRow}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className={styles.cart__checkoutButton}>
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
    </div>
  );
};

export default Cart;
