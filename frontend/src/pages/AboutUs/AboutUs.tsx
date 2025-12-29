import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './AboutUs.module.scss';

const AboutUs: React.FC = () => {
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
        <main className={styles.about}>
            <h1 className={styles.about__title}>About Us</h1>
            <div className={styles.about__content}>
                <p>
                    FLORIA was created with a simple idea: homes feel better when they are filled with life — and when that life is grown with care for the planet.
                </p>
                <p>
                    We curate indoor plants that are beautiful, easy to care for, and well-suited for everyday living. Each plant is selected with attention to quality, sustainability, and long-term health.
                </p>
                <p>
                    Our eco-friendly approach goes beyond packaging and sourcing. Every year, we plant 1,000 trees in a nearby forest, contributing to a healthier local ecosystem and a greener future.
                </p>
                <p>
                    At FLORIA, we believe plants are more than décor — they create atmosphere, support well-being, and connect us to nature. Our mission is to help you build a cozy, harmonious home while staying mindful of the world around us.
                </p>

                <h2>Our Commitment to Sustainability</h2>
                <p>We always wanted FLORIA to be more than a plant store.</p>
                <p>From the very beginning, our goal was not only to bring greenery into homes, but to make a positive difference beyond them. We believe that caring for plants naturally leads to caring for the world around us.</p>

                <p>That's why we actively take part in environmental initiatives — from planting trees to cleaning polluted lakes and supporting local eco-projects aimed at protecting and restoring nature.</p>

                Our key initiatives include:
                <ul className={styles.about__ecoInitiatives}>
                    <li><h3>🌱 1,000 trees planted every year</h3>
                        Each year, we plant 1,000 trees in a nearby forest, contributing to healthier ecosystems and a greener future.</li>
                    <li><h3>🌍 Environmental initiatives</h3>
                        We participate in clean-up actions for polluted lakes and natural areas, working alongside local communities to protect the places we all share.</li>
                    <li><h3>♻️ Mindful choices</h3>
                        Sustainability is woven into our daily decisions — responsible sourcing, eco-friendly packaging, and long-term thinking over short-term solutions.</li>
                </ul>

                <p>At FLORIA, impact is not a trend — it's a responsibility.
                    Because making your home feel cozy should also help make the world a better place.</p>
            </div >
        </main>
    );
};

export default React.memo(AboutUs);
