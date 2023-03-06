import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allOrders: [],
  selectedOrder: {},
  error: null,
};

export const updateOrder = createAsyncThunk(
  'updateOrder',
  async ( {paymentId, orderId }) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}`, paymentId);
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
});

export const { setError } = orderSlice.actions;

export default orderSlice.reducer;
