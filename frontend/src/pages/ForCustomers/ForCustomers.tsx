import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ForCustomers.module.scss';

const ForCustomers: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main className={styles.forCustomers}>
      <section className={styles.forCustomers__hero}>
        <h1 className={styles.forCustomers__title}>For Customers</h1>
        <p>
          We want every experience with <strong>FLORIA</strong> to feel simple,
          transparent, and enjoyable. Here you'll find everything you need to
          know about shopping with us.
        </p>
      </section>

      <section id="delivery" className={styles.forCustomers__section}>
        <h2>📦 Delivery</h2>
        <p>
          We carefully pack every plant to ensure it arrives healthy and
          beautiful.
        </p>
        <ul>
          <li>Orders are processed within <strong>1 - 2 business days</strong></li>
          <li>Delivery usually takes <strong>3 - 7 business days</strong></li>
          <li>Plants are packed using protective, eco-friendly materials</li>
          <li>A tracking number is provided once your order is shipped</li>
        </ul>
        <p className={styles.forCustomers__note}>
          Delivery times may vary due to weather conditions, as plant safety is
          our priority.
        </p>
      </section>

      <section className={styles.forCustomers__section}>
        <h2>🔄 Returns & Refunds</h2>
        <p>Your satisfaction matters to us.</p>
        <ul>
          <li>
            Contact us within <strong>48 hours</strong> if your plant arrives
            damaged or unhealthy
          </li>
          <li>Please include photos of the plant and packaging</li>
          <li>Approved refunds are processed within 5–7 business days</li>
          <li>
            Returns for change of mind are not accepted due to the perishable
            nature of plants
          </li>
        </ul>
      </section>

      <section className={styles.forCustomers__section}>
        <h2>🛒 Ordering & Payment</h2>
        <p className={styles.forCustomers__note}>
          Once an order is placed, changes may not be possible, as plants are
          prepared quickly to ensure freshness.
        </p>
        <ul>
          <li>We accept major credit and debit cards</li>
          <li>All payments are processed via secure, encrypted systems</li>
          <li>Prices are shown in your local currency (where available)</li>
          <li>An order confirmation email is sent after purchase</li>
        </ul>
      </section>

      <section id="eco-friendly" className={styles.forCustomers__section}>
        <h2>🌍 Eco-Friendly Commitment</h2>
        <p>
          We believe that beauty should exist in harmony with nature.
        </p>
        <ul>
          <li>We prioritize recyclable and sustainable packaging</li>
          <li>We minimize plastic whenever possible</li>
          <li>
            We support environmental initiatives such as tree planting and local
            clean-up projects
          </li>
        </ul>
      </section>

      <section className={styles.forCustomers__section}>
        <h2>🌱 Plant Care Responsibility</h2>
        <p>
          Plants are living organisms, and their well-being depends on proper
          care.
        </p>
        <ul>
          <li>Basic care guidelines are provided with every order</li>
          <li>
            Light, humidity, and watering significantly affect plant health
          </li>
          <li>
            We cannot guarantee longevity if care instructions are not followed
          </li>
        </ul>
      </section>

      <section className={`${styles.forCustomers__section} ${styles.forCustomers__support}`}>
        <h2>🖂 Customer Support</h2>
        <p>
          If you have any questions, please contact us via our contact form.
          Our support team will get back to you within <strong>24–48 hours</strong>.
        </p>
      </section>

      <section className={styles.forCustomers__footer}>
        <p>
          At FLORIA, we don't just sell plants — we help you create a space that
          feels alive, calm, and welcoming.
        </p>
        <span>Thank you for growing with us.</span>
      </section>
    </main>
  );
};

export default ForCustomers;
