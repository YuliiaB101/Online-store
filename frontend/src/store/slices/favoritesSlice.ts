import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FavoritesState, Product } from '../../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk<Product[]>(
  'favorites/fetchFavorites',
  async () => {
    const response = await axios.get(`${API_URL}/favorites`, {
      headers: getAuthHeader(),
    });
    return response.data;
  }
);

export const addToFavorites = createAsyncThunk<Product, number>(
  'favorites/addToFavorites',
  async (productId) => {
    const response = await axios.post(
      `${API_URL}/favorites`,
      { product_id: productId },
      { headers: getAuthHeader() }
    );
    return response.data;
  }
);

export const removeFromFavorites = createAsyncThunk<number, number>(
  'favorites/removeFromFavorites',
  async (productId) => {
    await axios.delete(`${API_URL}/favorites/${productId}`, {
      headers: getAuthHeader(),
    });
    return productId;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки избранного';
      })
      .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;
