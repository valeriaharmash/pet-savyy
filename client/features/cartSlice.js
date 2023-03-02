import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserOrder = createAsyncThunk(
  "cart/fetchUserCart",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      return data;
    } catch (err) {
      throw err.message;
    }
  }
);

const initialState = {
  order: [],
  status: "idle", // loading, succeeded, failed
  error: null,
};

export const userOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrder.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.order = action.payload;
      })
      .addCase(fetchUserOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = new Error(action.error.message);
        console.log(action.error.message);
      });
  },
});

export const selectUserCart = (state) => state.cart.order;

export default userOrderSlice.reducer;
