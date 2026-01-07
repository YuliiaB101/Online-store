import { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
    fetchProducts,
    setFilter,
    clearFilters,
} from '../../store/slices/productsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { RootState } from '../../types';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import styles from './Search.module.scss';

const Search = () => {
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const { items: products, filters } = useSelector(
        (state: RootState) => state.products,
        shallowEqual
    );

    /* Load categories — once */
    useEffect(() => {
        dispatch(fetchCategories() as any);
    }, [dispatch]);

    /* Fetch only when there is a search */
    useEffect(() => {
        if (filters.search) {
            dispatch(fetchProducts(filters) as any).finally(() =>
                setIsSearching(false)
            );
        }
    }, [dispatch, filters.search]);

    /* Clear filters when leaving Search page */
    useEffect(() => {
        return () => {
            dispatch(clearFilters());
        };
    }, [dispatch]);

    const handleSearch = () => {
        if (searchQuery.trim().length < 2) return;

        setIsSearching(true);
        dispatch(setFilter({ search: searchQuery.trim() }));
    };

    const handleClear = () => {
        setSearchQuery('');
        setIsSearching(false);
        dispatch(clearFilters());
    };

    return (
        <main className={styles.search}>
            <div className={styles.search__header}>
                <h1>Search Products</h1>
                <h2 className={styles.search__subtitle}>
                    Find your perfect plant
                </h2>

                <div className={styles.search__inputWrapper}>
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className={styles.search__input}
                        autoFocus
                    />

                    <button
                        onClick={handleSearch}
                        disabled={!searchQuery.trim()}
                        className={styles.search__button}
                    >
                        <img className={styles.search__icon} src="/icons/search.svg" alt="Search" />
                        Search
                    </button>

                    <button
                        onClick={handleClear}
                        className={styles.search__clearButton}
                    >
                        Clear
                    </button>
                </div>

                {filters.search && !isSearching && (
                    <div className={styles.search__info}>
                        <span className={styles.search__count}>
                            Found {products.length} result
                            {products.length !== 1 ? 's' : ''} for “{filters.search}”
                        </span>
                    </div>
                )}
            </div>

            {/* Results */}
            {filters.search ? (
                isSearching ? (
                    <ProductGrid products={[]} />
                ) : products.length > 0 ? (
                    <ProductGrid products={products} />
                ) : (
                    <div className={styles.search__empty}>
                        <p>No products found for “{filters.search}”</p>
                        <p>Try searching with different keywords</p>
                    </div>
                )
            ) : (
                <div className={styles.search__placeholder}>
                    <p>Enter a search term to find products</p>
                </div>
            )}
        </main>
    );
};

export default Search;
