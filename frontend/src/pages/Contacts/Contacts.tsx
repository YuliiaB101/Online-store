import React from 'react';
import styles from './Contacts.module.scss';

const Contacts: React.FC = () => {
    return (
        <main className={styles.contacts}>
            {/* Header */}
            <h1>Contacts</h1>

            {/* Intro */}
            <p className={styles.contacts__intro}>
                <span className={styles.contacts__highlight}>Let's stay connected!</span> We're always happy to hear from you. Whether you have a question about your order,
                need plant care advice, or simply want to say hello — our team is here for you.
            </p>

            {/* Info blocks */}
            <div className={styles.contacts__grid}>
                <div className={styles.contacts__grid__section}>
                    <h2>Customer Support</h2>
                    <p>
                        Email:{' '}
                        <a href="mailto:support@floria.com">support@floria.com</a>
                    </p>
                    <p className={styles.contacts__note}>
                        We reply within 24 hours on business days.
                    </p>
                </div>

                <div className={styles.contacts__grid__section}>
                    <h2>Orders & Shipping</h2>
                    <p>
                        Email:{' '}
                        <a href="mailto:orders@floria.com">orders@floria.com</a>
                    </p>
                    <p className={styles.contacts__note}>
                        For questions related to delivery, tracking, or returns.
                    </p>
                </div>

                <div className={styles.contacts__grid__section}>
                    <h2>Our Studio</h2>
                    <p>
                        FLORIA Studio<br />
                        Greenway Street 24<br />
                        Berlin, Germany
                    </p>
                    <p className={styles.contacts__note}>
                        Visits are possible by appointment only.
                    </p>
                </div>

                <div className={styles.contacts__grid__section}>
                    <h2>Working Hours</h2>
                    <ul className={styles.contacts__grid__working_hours}>
                        <li>Monday - Friday: 9:00 - 18:00</li>
                        <li>Saturday: 10:00 - 16:00</li>
                        <li>Sunday: Closed</li>
                    </ul>
                </div>
            </div>

            <div className={styles.contacts__map}>
                <ContactMap />
            </div>

            <div className={styles.contacts__footer}>
                <p className={styles.contacts__help}>
                    Need help choosing a plant? Our specialists will gladly help you find the perfect
                    match for your home.
                </p>
            </div>
        </main>
    );
};

const ContactMap = () => {
  return (
    <div className={styles.contacts__map__iframe}>
      <iframe
        title="FLORIA location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9710.902829913122!2d13.40152748915108!3d52.5203028595841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e21dbfb99f3%3A0x1c212049953dcf20!2zMTAxNzgg0JHQtdGA0LvQuNC9!5e0!3m2!1sru!2sde!4v1767026517474!5m2!1sru!2sde"
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default Contacts;
