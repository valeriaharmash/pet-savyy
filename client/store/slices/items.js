import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	allItems: [],
	selectedItem: {},
	error: null,
};

export const fetchSingleItem = createAsyncThunk(
	"fetchSingleItem",
	async (itemId) => {
		try {
			const { data: item } = await axios.get(`/api/items/${itemId}`);
			return { item };
		} catch (error) {
			console.error("Unable to fetch item.", error);
			return { error };
		}
	}
);

export const fetchItems = createAsyncThunk("fetchItems", async () => {
	try {
		const { data } = await axios.get("/api/items");
		return data;
	} catch (err) {
		//console.log(err)
		return [];
	}
});

export const addItemToCart = createAsyncThunk(
	"cart/addItem",
	async ({ userId, itemId, quantity = 1 }) => {
		try {
			const { data } = await axios.put(`/api/cart/${userId}/${itemId}`, {
				itemId: itemId,
				qty: quantity,
			});
			return data;
		} catch (err) {
			throw err.message;
		}
	}
);

export const updateItem = createAsyncThunk("updateItem", async (item) => {
	try {
		const { data } = await axios.put(`/api/items/${item.id}`, item);
		return data;
	} catch (error) {
		console.error("Unable to update item.", error);
		return { error };
	}
});

export const createItem = createAsyncThunk(
	"createItem",
	async ({ name, description, price, stock }) => {
		try {
			const { data: item } = await axios.post("/api/items", {
				name,
				description,
				price,
				stock,
			});
			return { item };
		} catch (error) {
			console.error("Unable to create item.", error);
			return { error };
		}
	}
);

export const deleteItem = createAsyncThunk("deleteItem", async (id) => {
	try {
		const { data } = await axios.delete(`/api/items/${id}`);
		return { id, data };
	} catch (error) {
		console.error("Unable to delete item.", error);
		return { error };
	}
});

const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		setError: (state, { payload: error }) => {
			state.error = error;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSingleItem.fulfilled, (state, { payload }) => {
			if (payload.error) {
				let errorMessage = "Something went wrong.";
				if (payload.error.response.status === 500) {
					errorMessage = "No items found.";
				}
				return { ...state, error: errorMessage };
			}
			return { ...state, selectedItem: payload.item };
		});
		builder.addCase(fetchItems.fulfilled, (state, action) => {
			state.allItems = action.payload;
		});
		builder.addCase(updateItem.fulfilled, (state, { payload }) => {
			state.singleItem = payload;
		});
		builder.addCase(createItem.fulfilled, (state, { payload }) => {
			if (payload.error) {
				let errorMessage = "Something went wrong.";
				if (payload.error.response.status === 500) {
					errorMessage = "Can not create item.";
				}
				return { ...state, error: errorMessage };
			}
			state.allItems.push(payload);
		});
		builder.addCase(deleteItem.fulfilled, (state, { payload }) => {
			state.allItems = state.allItems.filter((item) => item.id !== payload.id);
		});
		builder.addCase(addItemToCart.fulfilled, (state) => {
			state.error = null;
		});
	},
});

export const { setError } = itemsSlice.actions;

export const selectItems = (state) => {
	return state.items.allItems;
};

export default itemsSlice.reducer;
