import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types';
import styles from './ProductGrid.module.scss';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (products.length === 0) {
    return (
      <div className={`${styles.productGrid} ${styles['productGrid--empty']}`}>
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
