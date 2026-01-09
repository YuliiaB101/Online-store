import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './PlantCare.module.scss';

const PlantCare: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main className={styles.plantCare}>
      <section className={styles.plantCare__hero}>
        <h1>Plant Care & Resources</h1>
        <p>
          Welcome to our plant care hub! Here you'll find everything you need to keep your green friends healthy and thriving.
        </p>
      </section>

      <section id="guides" className={styles.plantCare__section}>
        <h2>🌿 Plant Care Guides</h2>
        <p>
          Learn how to properly care for your plants with our comprehensive guides.
        </p>

        <h3>Watering</h3>
        <ul>
          <li><strong>Indoor plants:</strong> Water when the top 1-2 inches of soil feel dry</li>
          <li><strong>Succulents:</strong> Water sparingly, allowing soil to dry completely between waterings</li>
          <li><strong>Tropical plants:</strong> Keep soil consistently moist but not waterlogged</li>
          <li>Always use pots with drainage holes to prevent root rot</li>
          <li>Room temperature water is best for most plants</li>
        </ul>

        <h3>Light Requirements</h3>
        <ul>
          <li><strong>Bright indirect light:</strong> Near windows with sheer curtains (most indoor plants)</li>
          <li><strong>Low light:</strong> North-facing windows or rooms without direct sun (snake plants, pothos)</li>
          <li><strong>Direct sunlight:</strong> South-facing windows (succulents, cacti)</li>
          <li>Rotate plants weekly for even growth</li>
        </ul>

        <h3>Common Issues</h3>
        <ul>
          <li><strong>Yellow leaves:</strong> Usually overwatering or poor drainage</li>
          <li><strong>Brown tips:</strong> Low humidity or inconsistent watering</li>
          <li><strong>Drooping leaves:</strong> Underwatering or root-bound plant</li>
          <li><strong>Pests:</strong> Isolate affected plants and treat with neem oil or insecticidal soap</li>
        </ul>
      </section>

      <section id="blog" className={styles.plantCare__section}>
        <h2>📝 Blog & Tips</h2>
        <p>
          Stay updated with the latest plant trends, seasonal tips, and inspiration.
        </p>

        <h3>Seasonal Plant Care</h3>
        <ul>
          <li><strong>Spring:</strong> Increase watering frequency as plants enter active growth</li>
          <li><strong>Summer:</strong> Watch for signs of heat stress and provide adequate humidity</li>
          <li><strong>Fall:</strong> Gradually reduce watering as growth slows down</li>
          <li><strong>Winter:</strong> Reduce watering and fertilizing, keep plants away from cold drafts</li>
        </ul>

        <h3>Beginner-Friendly Plants</h3>
        <ul>
          <li><strong>Pothos:</strong> Tolerates low light and inconsistent watering</li>
          <li><strong>Snake Plant:</strong> Thrives on neglect, perfect for busy lifestyles</li>
          <li><strong>Spider Plant:</strong> Easy to propagate and very forgiving</li>
          <li><strong>Peace Lily:</strong> Tells you when it needs water by drooping slightly</li>
        </ul>

        <h3>Indoor Gardening Tips</h3>
        <ul>
          <li>Group plants together to increase humidity naturally</li>
          <li>Clean leaves regularly to remove dust and improve photosynthesis</li>
          <li>Use a moisture meter if you're unsure about watering frequency</li>
          <li>Repot plants every 1-2 years or when roots become visible at the surface</li>
        </ul>
      </section>

      <section id="faq" className={styles.plantCare__section}>
        <h2>❓ Frequently Asked Questions</h2>

        <h3>How often should I fertilize my plants?</h3>
        <p>
          Most indoor plants benefit from fertilizing during the growing season (spring and summer) every 2-4 weeks. 
          Use a balanced liquid fertilizer diluted to half strength. Reduce or stop fertilizing in fall and winter when growth slows.
        </p>

        <h3>Why are my plant's leaves turning yellow?</h3>
        <p>
          Yellow leaves are usually caused by overwatering, poor drainage, or natural aging of older leaves. 
          Check the soil moisture and drainage holes. If soil is soggy, allow it to dry out before watering again.
        </p>

        <h3>How do I know if my plant needs repotting?</h3>
        <p>
          Signs your plant needs repotting include: roots growing through drainage holes, water running straight through the pot, 
          stunted growth, or soil that dries out very quickly after watering.
        </p>

        <h3>Can I propagate my plants at home?</h3>
        <p>
          Yes! Many plants like pothos, philodendron, and spider plants are easy to propagate. 
          Simply cut a healthy stem below a node, place in water, and wait for roots to develop before planting in soil.
        </p>

        <h3>How do I increase humidity for tropical plants?</h3>
        <ul>
          <li>Group plants together</li>
          <li>Use a pebble tray filled with water under the pot</li>
          <li>Mist plants regularly (but avoid misting fuzzy-leaved plants)</li>
          <li>Use a humidifier in the room</li>
        </ul>

        <h3>What's the best soil for indoor plants?</h3>
        <p>
          Most indoor plants thrive in well-draining potting mix. For succulents and cacti, use a special cactus mix or add extra perlite 
          to regular potting soil for better drainage. Avoid using garden soil indoors as it's too heavy and may contain pests.
        </p>

        <h3>How can I tell if my plant is getting too much or too little light?</h3>
        <ul>
          <li><strong>Too much light:</strong> Brown, scorched patches on leaves; pale or bleached appearance</li>
          <li><strong>Too little light:</strong> Leggy growth, small new leaves, loss of variegation in colorful varieties</li>
        </ul>
      </section>

      <section className={styles.plantCare__footer}>
        <p>
          Still have questions? Feel free to <a href="/contacts">contact us</a> — we're here to help your plants thrive! 🌱
        </p>
      </section>
    </main>
  );
};

export default PlantCare;
