import React, { useEffect } from 'react';
import styles from './Products.module.scss';
import Filters from 'components/Filters/Filters';
import ProductGrid from 'components/ProductGrid/ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { fetchFavourites } from '../../store/slices/favouritesSlice';
import { RootState } from '../../types';


const Products: React.FC = () => {
    const dispatch = useDispatch();
    const { items: products, loading, filters } = useSelector((state: RootState) => state.products);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchCategories() as any);
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCart() as any);
            dispatch(fetchFavourites() as any);
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        dispatch(fetchProducts(filters) as any);
    }, [dispatch, filters]);

    return (
        <main className={styles.products}>
            <div className={styles.products__header}>
                <h1 className={styles.products__title}>Our products</h1>
                <h2 className={styles.products__subtitle}>Thoughtfully selected plants for modern living</h2>
                <Filters />
                <div className={styles.products__info}>
                    <span className={styles.products__count}>Zeigt 1 - {products.length} von {products.length} Ergebnissen</span>
                </div>
            </div>
            <ProductGrid products={products} loading={loading} />
        </main>
    );
};

export default Products;
