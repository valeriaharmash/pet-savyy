import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allOrders: null,
  selectedOrder: {},
  pendingOrder: null,
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

export const fetchOrders = createAsyncThunk(
  'fetchOrders',
  async ({ status ,userId }) => {
    try {
      const { data } = await axios.get(`/api/orders`, {
        params: {
          status,
          userId
        }
      }, );
      return data;
    } catch (error) {
      console.error('Unable to fetch order.', error);
      return { error };
    }
  }
);

export const updateOrder = createAsyncThunk(
  'updateOrder',
  async ({ paymentId, orderId, shippingAddress, userId }) => {
    try {
      const { data } = await axios.put(`/api/orders`, {
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

export const deleteItem = createAsyncThunk(
  'deleteItem',
  async ({ itemId, subTotal }) => {
    try {
      const { data } = await axios.delete(`/api/orders`, {
        data: { itemId: itemId, total: subTotal },
      });
      return data;
    } catch (err) {
      throw err.message;
    }
  }
);


const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setPendingOrder: (state, { payload: pendingOrder }) => {
      state.pendingOrder = pendingOrder;
    },
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
      .addCase(fetchOrders.fulfilled, (state, {payload}) => {
      state.allOrders = payload;
      state.error = null;
    })
      .addCase(deleteItem.fulfilled, (state,{payload}) => {
        state.status = 'succeeded';
      })
  },
});

export const { setError, setPendingOrder } = orderSlice.actions;

export default orderSlice.reducer;
