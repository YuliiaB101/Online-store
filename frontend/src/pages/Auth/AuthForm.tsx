import React from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './Auth.module.scss';
import { Link } from 'react-router-dom';

interface AuthFormValues {
    name: string;
    email: string;
    password: string;
}

const AuthForm: React.FC = () => {
    const initialValues: AuthFormValues = { name: '', email: '', password: '' };

    return (
        <div className={styles.auth}>
            <h1 className={styles.auth__title}>Login</h1>
            <Formik
                className={styles.auth__form}
                initialValues={initialValues}
                onSubmit={() => { }}
            >
                {() => (
                    <Form className={styles.auth__group}>
                        <label className={styles.auth__label} htmlFor="email">Email:</label>
                        <Field className={styles.auth__input} id="email" name="email" placeholder="Enter your email" type="email" />

                        <label className={styles.auth__label} htmlFor="password">Password:</label>
                        <Field className={styles.auth__input} id="password" name="password" placeholder="Enter your password" type="password" />

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
