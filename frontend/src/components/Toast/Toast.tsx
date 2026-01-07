import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Toast as ToastType } from '../../types';
import { removeToast } from '../../store/slices/toastSlice';
import styles from './Toast.module.scss';

interface ToastItemProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ message, type = 'success', duration = 2000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast__item} ${styles[`toast__item_${type}`]}`}>
      <div className={styles.toast__content}>
        <span className={styles.toast__icon}>
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'info' && 'ℹ'}
        </span>
        <span className={styles.toast__message} dangerouslySetInnerHTML={{ __html: message }} />
      </div>
      <button className={styles.toast__close} onClick={onClose}>
        ×
      </button>
    </div>
  );
};

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  const handleClose = (id: string) => {
    dispatch(removeToast(id));
  };

  return (
    <div className={styles.toast}>
      {toasts.map((toast: ToastType) => (
        <ToastItem
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => handleClose(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;
