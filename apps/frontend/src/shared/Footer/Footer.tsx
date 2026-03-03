import React from "react";
import styles from "./Footer.module.scss";
import { footerConfig } from "./footerConfig";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
 <footer className={`${styles.footer} fade-in`}>
      <div className={styles.footer__top}>
        <div className={styles.footer__columns}>
          {[footerConfig.explore, footerConfig.information, footerConfig.tips].map(
            (section) => (
              <div className={styles.footer__column} key={section.title}>
                <h4 className={styles.footer__title}>{section.title}</h4>
                <ul className={styles.footer__list} >
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        <div className={styles.footer__newsletter}>
          <h4 className={styles.footer__title}>Stay Planted!</h4>
          <p className={styles.footer__newsletter_text}>
            Subscribe to our newsletter for exclusive offers and plant care tips.
          </p>

          <form className={styles.footer__newsletter_form}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.footer__newsletter_input}
            />
            <button className={styles.footer__newsletter_button}>Subscribe</button>
          </form>
        </div>
      </div>

      <div className={styles.footer__divider} />

      <div className={styles.footer__bottom}>
        <span>© 2025 FLORIA. All rights reserved.</span>

        <div className={styles.footer__links}>
          {footerConfig.bottomLinks.map((link) => (
            <Link key={link.label} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.footer__socials}>
            <Link to="#">
            <img className={styles.footer__icon} src="/icons/facebook-icon.svg" alt="Facebook" />
          </Link>
          <Link to="#">
            <img className={styles.footer__icon} src="/icons/instagram-icon.svg" alt="Instagram" />
          </Link>
          <Link to="#">
            <img className={styles.footer__icon} src="/icons/pinterest-icon.svg" alt="Pinterest" />
          </Link>
        </div>
      </div>
    </footer>
    );
};

export default React.memo(Footer);