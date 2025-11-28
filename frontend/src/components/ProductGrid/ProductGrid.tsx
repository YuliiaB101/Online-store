import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.scss';

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (products.length === 0) {
    return (
      <div className={`${styles.productGrid} ${styles['productGrid--empty']}`}>
        <p>Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
