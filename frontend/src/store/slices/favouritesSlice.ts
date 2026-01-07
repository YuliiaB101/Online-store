import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import { FavouritesState, Product } from '../../types';

const initialState: FavouritesState = {
  items: [],
  error: null,
};

export const fetchFavourites = createAsyncThunk<Product[]>(
  'favourites/fetchFavourites',
  async () => {
    const response = await axiosInstance.get('/favourites');
    return response.data;
  }
);

export const addToFavourites = createAsyncThunk<Product, number>(
  'favourites/addToFavourites',
  async (productId) => {
    const response = await axiosInstance.post(`/favourites/${productId}`);
    return response.data;
  }
);

export const removeFromFavourites = createAsyncThunk<number, number>(
  'favourites/removeFromFavourites',
  async (productId) => {
    await axiosInstance.delete(`/favourites/${productId}`);
    return productId;
  }
);

const FavouritesSlice = createSlice({
  name: 'Favourites',
  initialState,
  reducers: {
    clearFavouritesState: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.error = action.error.message || 'Error loading favourites';
      })
      .addCase(addToFavourites.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromFavourites.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clearFavouritesState } = FavouritesSlice.actions;
export default FavouritesSlice.reducer;
