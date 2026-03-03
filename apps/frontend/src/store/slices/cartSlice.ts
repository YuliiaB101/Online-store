import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import { CartState, CartItem } from '../../types';

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
    const response = await axiosInstance.get('/cart');
    return response.data;
  }
);

export const addToCart = createAsyncThunk<CartItem, AddToCartParams>(
  'cart/addToCart',
  async ({ productId, quantity = 1 }) => {
    const response = await axiosInstance.post('/cart', {
      product_id: productId,
      quantity,
    });
    return response.data;
  }
);

export const updateCartItem = createAsyncThunk<CartItem, UpdateCartParams>(
  'cart/updateCartItem',
  async ({ id, quantity }) => {
    const response = await axiosInstance.put(`/cart/${id}`, { quantity });
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk<number, number>(
  'cart/removeFromCart',
  async (id) => {
    await axiosInstance.delete(`/cart/${id}`);
    return id;
  }
);

export const clearCart = createAsyncThunk<void>(
  'cart/clearCart',
  async () => {
    await axiosInstance.delete('/cart');
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.items = [];
      state.error = null;
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load cart';
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

export const { incrementQuantity, decrementQuantity, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
