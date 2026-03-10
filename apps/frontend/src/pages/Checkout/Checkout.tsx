import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, CartItem } from '../../types';
import styles from './Checkout.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from 'store/slices/cartSlice';

const StepOne = () => (
    <div className={styles.checkout__form}>
        <label className={styles.checkout__label}>First name</label>
        <Field className={styles.checkout__input} type="text" name="firstName" placeholder="Enter your first name" />
        <ErrorMessage className={styles.checkout__error} name="firstName" component="div" />

        <label className={styles.checkout__label}>Second name</label>
        <Field className={styles.checkout__input} type="text" name="secondName" placeholder="Enter your second name" />
        <ErrorMessage className={styles.checkout__error} name="secondName" component="div" />

        <label className={styles.checkout__label}>Email</label>
        <Field className={styles.checkout__input} type="email" name="email" placeholder="Enter your email" />
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

        <label className={styles.checkout__label}>House number</label>
        <Field className={styles.checkout__input} type="text" name="houseNumber" />
        <ErrorMessage className={styles.checkout__error} name="houseNumber" component="div" />

        <label className={styles.checkout__label}>Index</label>
        <Field className={styles.checkout__input} type="text" name="index" />
        <ErrorMessage className={styles.checkout__error} name="index" component="div" />

        <label className={styles.checkout__label}>Phone number</label>
        <Field className={styles.checkout__input} type="tel" name="phoneNumber" />
        <ErrorMessage className={styles.checkout__error} name="phoneNumber" component="div" />
    </div>
);

const StepThree = () => (
    <div className={styles.checkout__form}>
        <label className={styles.checkout__label}>Card number</label>
        <Field className={styles.checkout__input} type="text" name="cardNumber" />
        <ErrorMessage className={styles.checkout__error} name="cardNumber" component="div" />

        <label className={styles.checkout__label}>Expiry date</label>
        <Field className={styles.checkout__input} type="date" name="expiryDate" />
        <ErrorMessage className={styles.checkout__error} name="expiryDate" component="div" />
    </div>
);

const StepFour = () => {
    const { items } = useSelector((state: RootState) => state.cart);
    const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
    return (
        <div className={styles.checkout__form}>
            <div className={styles.checkout__summary}>
                <div className={styles.checkout__summaryContent}>
                    <span><strong>Items ({items.map(item => item.quantity).reduce((a, b) => a + b, 0)}):</strong></span>
                </div>

                {items.map((item) => (
                    <div key={item.id} className={styles.checkout__summaryRow}>
                        <span>{item.name}:{'\u00A0\u00A0'}<strong>{item.quantity} x ${item.price}</strong></span>
                        <span><strong>${(item.quantity * item.price).toFixed(2)}</strong></span>
                    </div>
                ))}

                <div className={styles.checkout__summaryTotal}>
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

const StepFive = () => {
    const { items } = useSelector((state: RootState) => state.cart);
    const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

    return (
        <div className={styles.checkout__form}>
            <div className={styles.checkout__success}>
                <div className={styles.checkout__success__icon}>✓</div>
                <h3 className={styles.checkout__success__title}>Order Placed Successfully!</h3>
                <p className={styles.checkout__success__message}>
                    Thank you for your purchase! Your order has been confirmed and will be processed shortly.
                </p>
                <div className={styles.checkout__success__details}>
                    <p><strong>Order total:</strong> ${total.toFixed(2)}</p>
                    <p><strong>Items:</strong> {items.length} product(s)</p>
                </div>
                <p className={styles.checkout__success__info}>
                    You will receive an email confirmation at your registered email address.
                </p>
            </div>
        </div>
    );
};

const renderStep = (step: number) => {
    switch (step) {
        case 0:
            return <StepOne />;
        case 1:
            return <StepTwo />;
        case 2:
            return <StepThree />;
        case 3:
            return <StepFour />;
        case 4:
            return <StepFive />;
        default:
            return <StepOne />;
    }
};

const StepOneSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    secondName: Yup.string().required('Second name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
});

const StepTwoSchema = Yup.object().shape({
    city: Yup.string().required('City is required'),
    street: Yup.string().required('Street is required'),
    houseNumber: Yup.string().required('House number is required'),
    index: Yup.string().required('Index is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
});

const StepThreeSchema = Yup.object().shape({
    cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, 'Card number must be 16 digits')
        .required('Card number is required'),
    expiryDate: Yup.date().required('Expiry date is required'),
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
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [currentStep]);

    const initialValues = {
        firstName: '',
        secondName: '',
        email: user?.email || '',
        city: '',
        street: '',
        houseNumber: '',
        index: '',
        phoneNumber: '',
        cardNumber: '',
        expiryDate: '',
    };

    const steps = ['Personal details', 'Address', 'Payment', 'Review order', 'Completed'];

    // Function to proceed to the next step
    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Function to proceed to the previous step
    const prevStep = () => {
        if (currentStep > 0) {
            console.log('Going back from step', currentStep);
            setCurrentStep(currentStep - 1);
        }
    };

    const nextButtonLabel = () => {
        if (currentStep === 2) return 'Review order';
        if (currentStep === 3) return 'Confirm order';
        if (currentStep === 4) return 'Continue shopping';
        return 'Next';
    };

    return (
        <main className={styles.checkout}>
            <h1>Checkout</h1>

            <div className={styles.checkout__steps}>
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`${styles.checkout__step} ${index === currentStep ? styles.checkout__step_active : ''
                            } ${index < currentStep ? styles.checkout__step_completed : ''
                            }`}
                    >
                        <div className={styles.checkout__step__number}>{index + 1}</div>
                        <div className={styles.checkout__step__label}>{step}</div>
                    </div>
                ))}
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema(currentStep)}
                validateOnChange={true}
                validateOnBlur={true}
                enableReinitialize={true}
                onSubmit={() => {
                    if (currentStep === steps.length - 1) {
                        dispatch(clearCart() as any);
                        navigate('/');
                    } else {
                        nextStep();
                    }
                }}
            >
                {({ isValid }: FormikProps<typeof initialValues>) => (
                    <Form>
                        <h2 className={styles.checkout__subtitle}>{steps[currentStep]}</h2>
                        {renderStep(currentStep)}
                        <div className={styles.checkout__buttons}>
                            <button className={styles.checkout__buttons__back} onClick={prevStep} disabled={currentStep === 0 || currentStep === 4} type="button">
                                Back
                            </button>
                            <button
                                className={styles.checkout__buttons__next}
                                type="submit"
                                disabled={!isValid && currentStep < 3}
                            >
                                {nextButtonLabel()}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className={styles.checkout__footer}>
                Want to change items in your cart? <Link to="/cart">Cart</Link>
            </div>
        </main>
    );
};

export default Checkout;