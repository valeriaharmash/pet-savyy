import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserOrder = createAsyncThunk(
	'cart/fetchUserCart',
	async (userId) => {
		try {
			const { data } = await axios.get(`/api/cart/${userId}`);
			return data;
		} catch (err) {
			throw err.message;
		}
	}
);

export const setOrderQty = createAsyncThunk(
	'cart/updateUserCart',
	async ({ userId, itemId, quantity }) => {
		try {
			const { data } = await axios.put(`/api/cart/${userId}`, {
				itemId: itemId,
				qty: quantity,
			});
			return data;
		} catch (err) {
			throw err.message;
		}
	}
);

export const deleteItem = createAsyncThunk(
	'cart/deleteItem',
	async ({ userId, itemId, subTotal }) => {
		try {
			const { data } = await axios.delete(`/api/cart/${userId}`, {
				data: { itemId: itemId, total: subTotal },
			});
			return data;
		} catch (err) {
			throw err.message;
		}
	}
);

const initialState = {
	orderId: null,
	order: [],
	status: 'idle', // loading, succeeded, failed
	error: null,
};

export const userOrderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserOrder.pending, (state, action) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchUserOrder.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = null;
				state.order = action.payload;
				state.orderId = action.payload.reduce((acc, item) => {
					return item.order.id;
				}, 0);
			})
			.addCase(fetchUserOrder.rejected, (state, action) => {
				state.status = 'failed';
				state.error = new Error(action.error.message);
				console.log(action.error.message);
			})
			.addCase(setOrderQty.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.order = action.payload;
			})
			.addCase(deleteItem.fulfilled, (state, action) => {
				state.status = 'succeeded';
			});
	},
});

export const selectUserCart = (state) => state.cart.order;

export default userOrderSlice.reducer;
