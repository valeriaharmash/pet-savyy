import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allOrders: null,
  selectedOrder: null,
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
  async ({ status, userId }) => {
    try {
      const { data } = await axios.get(`/api/orders`, {
        params: {
          status,
          userId
        }
      },);
      return data;
    } catch (error) {
      console.error('Unable to fetch order.', error);
      return { error };
    }
  }
);

export const updateOrder = createAsyncThunk(
  'updateOrder',
  async ({ paymentId, orderId, shippingAddress, status, recipientName }) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}`, {
        paymentId,
        shippingAddress,
        status,
        recipientName
      });
      return data;
    } catch (error) {
      console.error('Unable to update order.', error);
      return { error };
    }
  }
);
export const updateOrderItem = createAsyncThunk(
  'updateOrderItem',
  async ({ orderId, itemId, qty }) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}/items/${itemId}`, {
        qty
      });
      return data;
    } catch (error) {
      console.error('Unable to update order item.', error);
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

export const fetchOrder = createAsyncThunk(
  'fetchOrder',
  async (orderId) => {
    try {
      const { data: order } = await axios.get(`/api/orders/${orderId}`);
      return order;
    } catch (error) {
      console.error('Unable to fetch order.', error);
      return { error };
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
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.selectedOrder = payload;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.allOrders = payload;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, { payload: order }) => {
        state.selectedOrder = order;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
      })
      .addCase(updateOrderItem.fulfilled, (state, { payload }) => {
        state.error = null;
      });
  },
});

export const { setError, setPendingOrder } = orderSlice.actions;

export default orderSlice.reducer;
