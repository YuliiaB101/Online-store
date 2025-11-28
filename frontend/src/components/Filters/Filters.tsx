import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilters } from '../../store/slices/productsSlice';
import styles from './Filters.module.scss';

const Filters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);
  
  const [localSearch, setLocalSearch] = useState(filters.search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setFilter({ search: localSearch }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localSearch, dispatch]);

  const handleCategoryChange = (e) => {
    dispatch(setFilter({ category: e.target.value }));
  };

  const handleSortChange = (e) => {
    dispatch(setFilter({ sortBy: e.target.value }));
  };

  const handleOrderChange = (e) => {
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
          placeholder="Поиск товаров..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className={styles.filters__search}
        />

        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className={styles.filters__select}
        >
          <option value="">Все категории</option>
          {categories.map((category) => (
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
          <option value="created_at">По дате</option>
          <option value="price">По цене</option>
          <option value="likes">По популярности</option>
          <option value="name">По названию</option>
        </select>

        <select
          value={filters.order}
          onChange={handleOrderChange}
          className={styles.filters__select}
        >
          <option value="DESC">По убыванию</option>
          <option value="ASC">По возрастанию</option>
        </select>

        <button onClick={handleClearFilters} className={styles.filters__clear}>
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default Filters;
