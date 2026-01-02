import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Products.module.scss';
import Filters from 'components/Filters/Filters';
import ProductGrid from 'components/ProductGrid/ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilter } from '../../store/slices/productsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { fetchFavourites } from '../../store/slices/favouritesSlice';
import { RootState } from '../../types';


const Products: React.FC = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { items: products, filters } = useSelector((state: RootState) => state.products);
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

    // Apply category filter from URL (supports multiple categories separated by comma)
    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            // Split by comma to support multiple categories
            const categories = category.split(',').map(c => c.trim());
            dispatch(setFilter({ category: categories.length > 1 ? categories.join(',') : category }));
        }
    }, [searchParams, dispatch]);

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
                    <span className={styles.products__count}>Showed 1 - {products.length} of {products.length} results</span>
                </div>
            </div>
            <ProductGrid products={products}/>
        </main>
    );
};

export default Products;
