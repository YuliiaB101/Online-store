import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../store/slices/authSlice';
import { RootState } from '../../types';
import styles from './Auth.module.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(formData) as any);
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>Регистрация</h1>
      <form onSubmit={handleSubmit} className={styles.auth__form}>
        {error && <div className={styles.auth__error}>{error}</div>}
        
        <div className={styles.auth__group}>
          <label htmlFor="name" className={styles.auth__label}>
            Имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.auth__input}
          />
        </div>

        <div className={styles.auth__group}>
          <label htmlFor="email" className={styles.auth__label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.auth__input}
          />
        </div>

        <div className={styles.auth__group}>
          <label htmlFor="password" className={styles.auth__label}>
            Пароль (минимум 6 символов)
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className={styles.auth__input}
          />
        </div>

        <button 
          type="submit" 
          className={styles.auth__button}
          disabled={loading}
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className={styles.auth__footer}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </div>
    </div>
  );
};

export default Register;
