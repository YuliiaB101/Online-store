import { useEffect } from 'react';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Auth.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';
import { login } from '../../store/slices/authSlice';

interface AuthFormValues {
    name: string;
    email: string;
    password: string;
}

const initialValues: AuthFormValues = {
    name: '',
    email: '',
    password: '',
};

const validationSchema: Yup.ObjectSchema<AuthFormValues> = Yup.object().shape({
    name: Yup.string().min(2, 'Name should be at least 2 characters').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password should be at least 6 characters').required('Required'),
});

const AuthForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);


    const handleSubmit = (values: AuthFormValues) => {
        dispatch(login(values) as any);
    };

    return (
        <div className={styles.auth}>
            <h1 className={styles.auth__title}>Login</h1>
            <Formik<AuthFormValues>
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => { handleSubmit(values) }}
            >
                {() => (
                    <Form className={styles.auth__form}>
                        <label className={styles.auth__label} htmlFor="email">Email:</label>
                        <Field className={styles.auth__input} id="email" name="email" placeholder="Enter your email" type="email" />
                        <ErrorMessage className={styles.auth__error} name="email" component="div" />

                        <label className={styles.auth__label} htmlFor="password">Password:</label>
                        <Field className={styles.auth__input} id="password" name="password" placeholder="Enter your password" type="password" />
                        <ErrorMessage className={styles.auth__error} name="password" component="div" />
                        <button className={styles.auth__button} type="submit">Submit</button>
                    </Form>
                )}
            </Formik>

            <div className={styles.auth__footer}>
                Still don't have an account? <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default AuthForm;
