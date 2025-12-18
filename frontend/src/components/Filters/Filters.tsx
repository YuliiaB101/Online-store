import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilters } from '../../store/slices/productsSlice';
import { RootState, Category } from '../../types';
import styles from './Filters.module.scss';

const Filters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.products);
  const { items: categories } = useSelector((state: RootState) => state.categories);
  
  const [localSearch, setLocalSearch] = useState(filters.search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setFilter({ search: localSearch }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localSearch, dispatch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ category: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ sortBy: e.target.value }));
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ order: e.target.value }));
  };

  const handleClearFilters = () => {
    setLocalSearch('');
    dispatch(clearFilters());
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__row}>
        <input
          type="text"
          placeholder="Search products..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className={styles.filters__search}
        />

        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className={styles.filters__select}
        >
          <option className={styles.filters__option} value="">All categories</option>
          {categories.map((category: Category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className={styles.filters__select}
        >
          <option value="created_at">By date</option>
          <option value="price">By price</option>
          <option value="likes">By popularity</option>
          <option value="name">By name</option>
        </select>

        <select
          value={filters.order}
          onChange={handleOrderChange}
          className={styles.filters__select}
        >
          <option value="DESC">Descending</option>
          <option value="ASC">Ascending</option>
        </select>

        <button onClick={handleClearFilters} className={styles.filters__clear}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
