import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BannersState, Banner } from '../../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialState: BannersState = {
  items: [],
  error: null,
};

export const fetchBanners = createAsyncThunk<Banner[]>(
  'banners/fetchBanners',
  async () => {
    const response = await axios.get(`${API_URL}/banners`);
    return response.data;
  }
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action: PayloadAction<Banner[]>) => {
        state.items = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки баннеров';
      });
  },
});

export default bannersSlice.reducer;
