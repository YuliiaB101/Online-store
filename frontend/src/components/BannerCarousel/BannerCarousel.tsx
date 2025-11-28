import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner } from '../../types';
import styles from './BannerCarousel.module.scss';

interface BannerCarouselProps {
  banners: Banner[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBannerClick = (link: string) => {
    if (link) {
      navigate(link);
    }
  };

  if (banners.length === 0) return null;

  return (
    <div className={styles.banner}>
      <div 
        className={styles.banner__slider}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div 
            key={banner.id} 
            className={styles.banner__slide}
            onClick={() => handleBannerClick(banner.link)}
          >
            <img src={banner.image_url} alt={banner.title} />
            {banner.title && (
              <div className={styles.banner__slideContent}>
                <h2>{banner.title}</h2>
              </div>
            )}
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button 
            className={`${styles.banner__arrow} ${styles['banner__arrow--left']}`}
            onClick={goToPrevious}
          >
            ‹
          </button>
          <button 
            className={`${styles.banner__arrow} ${styles['banner__arrow--right']}`}
            onClick={goToNext}
          >
            ›
          </button>

          <div className={styles.banner__controls}>
            {banners.map((_, index) => (
              <button
                key={index}
                className={`${styles.banner__dot} ${
                  index === currentIndex ? styles['banner__dot--active'] : ''
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BannerCarousel;
