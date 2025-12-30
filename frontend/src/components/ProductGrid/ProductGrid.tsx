import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types';
import styles from './ProductGrid.module.scss';

interface ProductGridProps {
  products: Product[];
}

const SKELETON_COUNT = 12;

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const isEmpty = products.length === 0;

  return (
    <div
      className={`${styles.productGrid} ${
        isEmpty ? styles['productGrid--loading'] : ''
      }`}
    >
      {isEmpty
        ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <div key={index} className={styles.skeletonCard} />
          ))
        : products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
};

export default ProductGrid;
