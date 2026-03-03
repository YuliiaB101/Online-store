import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductsState, Product } from '../../types';
import { API_URL } from '../../utils/axiosConfig';

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  error: null,
  filters: {
    search: '',
    category: '',
    sortBy: 'created_at',
    order: 'desc',
  },
};

interface FetchProductsParams {
  search?: string;
  category?: string;
  sortBy?: string;
  order?: string;
}

export const fetchProducts = createAsyncThunk<Product[], FetchProductsParams>(
  'products/fetchProducts',
  async (params = {}) => {
    const response = await axios.get(`${API_URL}/products`, { params });
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk<Product, string | undefined>(
  'products/fetchProductById',
  async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  }
);

export const likeProduct = createAsyncThunk<Product, number>(
  'products/likeProduct',
  async (id) => {
    const response = await axios.post(`${API_URL}/products/${id}/like`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Loading products error';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.error.message || 'Loading product error';
      })
      .addCase(likeProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentProduct?.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
      });
  },
});

export const { setFilter, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
