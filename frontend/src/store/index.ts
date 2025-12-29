import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import favouritesReducer from './slices/favouritesSlice';
import categoriesReducer from './slices/categoriesSlice';
import bannersReducer from './slices/bannersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    favourites: favouritesReducer,
    categories: categoriesReducer,
    banners: bannersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
