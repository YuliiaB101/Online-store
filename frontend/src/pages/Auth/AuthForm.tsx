import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import styles from './Auth.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';
import { login, register } from '../../store/slices/authSlice';

interface AuthFormProps {
  mode: 'login' | 'register';
}

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const isRegisterMode = mode === 'register';

  const initialValues = isRegisterMode
    ? { name: '', email: '', password: '' }
    : { email: '', password: '' };

  const validationSchema = isRegisterMode
    ? Yup.object().shape({
        name: Yup.string().min(2, 'Name should be at least 2 characters').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Password should be at least 6 characters').required('Required'),
      })
    : Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Password should be at least 6 characters').required('Required'),
      });

  const handleSubmit = (values: LoginValues | RegisterValues) => {
    if (isRegisterMode) {
      dispatch(register(values as RegisterValues) as any);
    } else {
      dispatch(login(values as LoginValues) as any);
    }
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>
        {isRegisterMode ? 'Register' : 'Login'}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty, errors, touched }: FormikProps<LoginValues | RegisterValues>) => (
          <Form className={styles.auth__form}>
            {isRegisterMode && (
              <>
                <label className={styles.auth__label} htmlFor="name">Name:</label>
                <Field 
                  className={`${styles.auth__input} ${'name' in errors && errors.name && 'name' in touched && touched.name ? styles.auth__input_error : ''}`}
                  id="name" 
                  name="name" 
                  placeholder="Enter your name" 
                  type="text" 
                />
                <ErrorMessage className={styles.auth__error} name="name" component="div" />
              </>
            )}

            <label className={styles.auth__label} htmlFor="email">Email:</label>
            <Field 
              className={`${styles.auth__input} ${isValid ? styles.auth__input_success : ''} ${errors.email && touched.email ? styles.auth__input_error : ''}`}
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              type="email" 
            />
            <ErrorMessage className={styles.auth__error} name="email" component="div" />

            <label className={styles.auth__label} htmlFor="password">Password:</label>
            <Field 
              className={`${styles.auth__input} ${isValid ? styles.auth__input_success : ''} ${errors.password && touched.password ? styles.auth__input_error : ''}`}
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              type="password" 
            />
            <ErrorMessage className={styles.auth__error} name="password" component="div" />
            
            <button 
              className={styles.auth__button} 
              type="submit"
              disabled={!isValid || !dirty}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>

      <div className={styles.auth__footer}>
        {isRegisterMode ? (
          <>Already have an account? <Link to="/login">Login</Link></>
        ) : (
          <>Still don't have an account? <Link to="/register">Register</Link></>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
