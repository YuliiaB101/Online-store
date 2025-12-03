import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CategoriesState, Category } from '../../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки категорий';
      });
  },
});

export default categoriesSlice.reducer;
