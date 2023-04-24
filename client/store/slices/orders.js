import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteItem, fetchUserOrder, mergeLocalCart, setOrderQty } from './cart';

const initialState = {
  allOrders: [],
  selectedOrder: {},
  error: null,
};

export const createOrder = createAsyncThunk(
  'createOrder',
  async ({ userId }) => {
    try {
      const { data } = await axios.post(`/api/orders`, {
        userId,
      });
      return data;
    } catch (error) {
      console.error('Unable to create order.', error);
      return { error };
    }
  }
);

export const updateOrder = createAsyncThunk(
  'updateOrder',
  async ({ paymentId, orderId, shippingAddress, userId }) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}`, {
        paymentId,
        shippingAddress,
        userId,
      });
      return data;
    } catch (error) {
      console.error('Unable to update order.', error);
      return { error };
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setError: (state, { payload: error }) => {
      state.error = error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, {payload}) => {
        state.selectedOrder = payload;
        state.error = null;
      })
  },
});

export const { setError } = orderSlice.actions;

export default orderSlice.reducer;
