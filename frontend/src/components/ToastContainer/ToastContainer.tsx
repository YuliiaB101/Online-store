import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Toast as ToastType } from '../../types';
import { removeToast } from '../../store/slices/toastSlice';
import Toast from '../Toast/Toast';
import styles from './ToastContainer.module.scss';

const ToastContainer: React.FC = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  const handleClose = (id: string) => {
    dispatch(removeToast(id));
  };

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast: ToastType) => (
        <Toast
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

export default ToastContainer;