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

  const handleQuickFilter = (categories: string) => {
    // If the filter is already active, deactivate it
    if (filters.category === categories) {
      dispatch(setFilter({ category: '' }));
    } else {
      dispatch(setFilter({ category: categories }));
    }
  };

  const isActiveFilter = (categories: string) => {
    return filters.category === categories;
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__quick}>
        <button 
          onClick={() => handleQuickFilter('foliage,succulents,flowering-plants,pothos')}
          className={`${styles.filters__quickBtn} ${isActiveFilter('foliage,succulents,flowering-plants,orchids,pothos') ? styles['filters__quickBtn--active'] : ''}`}
        >
          Indoor Plants
        </button>
        <button 
          onClick={() => handleQuickFilter('outdoor-plants,cacti,herbs')}
          className={`${styles.filters__quickBtn} ${isActiveFilter('outdoor-plants,cacti,herbs') ? styles['filters__quickBtn--active'] : ''}`}
        >
          Outdoor Plants
        </button>
        <button 
          onClick={() => handleQuickFilter('planters-pots')}
          className={`${styles.filters__quickBtn} ${isActiveFilter('planters-pots') ? styles['filters__quickBtn--active'] : ''}`}
        >
          Pots
        </button>
        <button 
          onClick={() => handleQuickFilter('gardening-tools')}
          className={`${styles.filters__quickBtn} ${isActiveFilter('gardening-tools') ? styles['filters__quickBtn--active'] : ''}`}
        >
          Accessories
        </button>
      </div>
      
      <div id="search" className={styles.filters__row}>
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
          <option value="rating_avg">By popularity</option>
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
