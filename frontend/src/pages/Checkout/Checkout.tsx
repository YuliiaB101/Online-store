import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Checkout.module.scss';
import { Link } from 'react-router-dom';

const StepOne = () => (
    <div className={styles.checkout__form}>
        <label className={styles.checkout__label}>Name</label>
        <Field className={styles.checkout__input} type="text" name="name" />
        <ErrorMessage className={styles.checkout__error} name="name" component="div" />

        <label className={styles.checkout__label}>Email</label>
        <Field className={styles.checkout__input} type="email" name="email" />
        <ErrorMessage className={styles.checkout__error} name="email" component="div" />
    </div>
);

const StepTwo = () => (
    <div className={styles.checkout__form}>
        <label className={styles.checkout__label}>City</label>
        <Field className={styles.checkout__input} type="text" name="city" />
        <ErrorMessage className={styles.checkout__error} name="city" component="div" />

        <label className={styles.checkout__label}>Street</label>
        <Field className={styles.checkout__input} type="text" name="street" />
        <ErrorMessage className={styles.checkout__error} name="street" component="div" />
    </div>
);

const StepThree = () => (
    <div className={styles.checkout__form}>
        <label className={styles.checkout__label}>Card number</label>
        <Field className={styles.checkout__input} type="text" name="cardNumber" />
        <ErrorMessage className={styles.checkout__error} name="cardNumber" component="div" />

        <label className={styles.checkout__label}>Expiry date</label>
        <Field className={styles.checkout__input} type="text" name="expiryDate" />
        <ErrorMessage className={styles.checkout__error} name="expiryDate" component="div" />
    </div>
);

const renderStep = (step: number) => {
    switch (step) {
        case 0:
            return <StepOne />;
        case 1:
            return <StepTwo />;
        case 2:
            return <StepThree />;
        default:
            return <StepOne />;
    }
};

const StepOneSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
});

const StepTwoSchema = Yup.object().shape({
    city: Yup.string().required('City is required'),
    street: Yup.string().required('Street is required'),
});

const StepThreeSchema = Yup.object().shape({
    cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, 'Card number must be 16 digits')
        .required('Card number is required'),
    expiryDate: Yup.string().required('Expiry date is required'),
});

const validationSchema = (step: number) => {
    switch (step) {
        case 0:
            return StepOneSchema;
        case 1:
            return StepTwoSchema;
        case 2:
            return StepThreeSchema;
        default:
            return StepOneSchema;
    }
}

const Checkout: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);

    const initialValues = {
        name: '',
        email: '',
        city: '',
        street: '',
        cardNumber: '',
        expiryDate: '',
    };

    const steps = ['Personal data', 'Address', 'Payment'];

    // Function to proceed to the next step
    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Function to proceed to the previous step
    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className={styles.checkout}>
            <h1 className={styles.checkout__title}>Checkout</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    if (currentStep === steps.length - 1) {
                        console.log('Form submitted:', values);
                    } else {
                        nextStep();
                    }
                }}
            >
                {() => (
                    <Form>
                        <h1 className={styles.checkout__title}>{steps[currentStep]}</h1>
                        {renderStep(currentStep)}
                        <div>
                            <button className={styles.checkout__button} onClick={prevStep} disabled={currentStep === 0}>
                                Back
                            </button>
                            <button className={styles.checkout__button} type="submit">
                                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </button>\
                        </div>
                    </Form>
                )}
            </Formik>

            <div className={styles.auth__footer}>
                Want to change items in your cart? <Link to="/cart">Cart</Link>
            </div>
        </div>
    );
};

export default Checkout;