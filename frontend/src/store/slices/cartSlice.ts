import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartState, CartItem } from '../../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

const initialState: CartState = {
  items: [],
  error: null,
};

interface AddToCartParams {
  productId: number;
  quantity?: number;
}

interface UpdateCartParams {
  id: number;
  quantity: number;
}

export const fetchCart = createAsyncThunk<CartItem[]>(
  'cart/fetchCart',
  async () => {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: getAuthHeader(),
    });
    return response.data;
  }
);

export const addToCart = createAsyncThunk<CartItem, AddToCartParams>(
  'cart/addToCart',
  async ({ productId, quantity = 1 }) => {
    const response = await axios.post(
      `${API_URL}/cart`,
      { product_id: productId, quantity },
      { headers: getAuthHeader() }
    );
    console.log('Added to cart:', productId, 'Response:', response.data);
    return response.data;
  }
);

export const updateCartItem = createAsyncThunk<CartItem, UpdateCartParams>(
  'cart/updateCartItem',
  async ({ id, quantity }) => {
    const response = await axios.put(
      `${API_URL}/cart/${id}`,
      { quantity },
      { headers: getAuthHeader() }
    );
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk<number, number>(
  'cart/removeFromCart',
  async (id) => {
    await axios.delete(`${API_URL}/cart/${id}`, {
      headers: getAuthHeader(),
    });
    return id;
  }
);

export const clearCart = createAsyncThunk<void>(
  'cart/clearCart',
  async () => {
    await axios.delete(`${API_URL}/cart`, {
      headers: getAuthHeader(),
    });
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки корзины';
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find((item) => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity = action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
